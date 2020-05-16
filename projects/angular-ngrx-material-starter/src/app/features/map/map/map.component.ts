import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {
  defaults as defaultControls,
  Attribution,
  FullScreen
} from 'ol/control';
import { toLonLat } from 'ol/proj';
import { getBottomLeft, getTopRight } from 'ol/extent';
import { Icon, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import Overlay from 'ol/Overlay';
import { MapView } from '../interfaces/map-view';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
import { MapSearchService } from '../map-search.service';
import Geolocation from 'ol/Geolocation';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import Translate from 'ol/interaction/Translate';
import { DynamicEvent } from '../feature-details/interfaces/dynamic-event';
import { DynamicComponentEventsService } from '../feature-details/dynamic-component-events.service';

@Component({
  selector: 'anms-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: any;

  attribution: Attribution;

  popup: Overlay;

  popupHidden = true;

  vectorSource: VectorSource;
  editVectorSource: VectorSource;
  private editVectorLayer: VectorLayer;
  editRichFeature;
  userInteraction = [];

  zIndex = 1;

  locationRetrieved = false;
  private mousePositionControl: MousePosition;

  constructor(
    private location: Location,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute,
    private searchService: MapSearchService,
    private dynCmpEvtsService: DynamicComponentEventsService
  ) {}

  ngOnInit(): void {
    this.attribution = new Attribution({
      collapsible: false
    });

    this.vectorSource = new VectorSource({
      features: [this.toFeature({ lonLat: [26.057, 44.43] })]
    });

    this.editVectorSource = new VectorSource({
      features: []
    });

    const vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.editVectorLayer = new VectorLayer({
      source: this.editVectorSource
    });

    this.initMousePosition();

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: Infinity,
          source: new OSM()
        }),
        vectorLayer,
        this.editVectorLayer
      ],
      view: new View({
        center: olProj.fromLonLat([26.057, 44.43]),
        zoom: 10
      }),
      controls: defaultControls({ attribution: false }).extend([
        this.attribution
      ])
      // .extend([ new FullScreen({ source: 'fullscreen' }) ]), https://openlayers.org/en/latest/examples/full-screen-source.html
    });

    // https://openlayers.org/en/latest/examples/attributions.html
    window.addEventListener('resize', () => this.checkSize());
    this.checkSize();

    // https://openlayers.org/en/latest/examples/moveend.html
    this.map.on('moveend', () => this.onMoveEnd());

    // https://openlayers.org/en/latest/examples/icon.html
    this.initPopUp();

    this.jumpToLocation();

    this.retrieveLocation();

    // to allow clickable area behind @TODO check if uv and fixed size is better
    this.zIndex = 30000;

    this.initEditTransform();

    // @TODO replace with chainof responsability
    this.dynCmpEvtsService.eventObserver.subscribe(evt => {
      console.log(evt);
      if (evt.type === 'suppress-new-feature') {
        this.editRichFeature = undefined;
        this.editReplace();
        this.popupHidden = true;
      }
    });
  }

  ngAfterViewInit(): void {}

  checkSize() {
    const small = this.map.getSize()[0] < 600;
    this.attribution.setCollapsible(small);
    this.attribution.setCollapsed(small);
  }

  onMoveEnd() {
    this.popupHidden = true;

    this.retrieveData();
    this.editReplace();
    this.updateMapView();
    this.userInteraction = [];
  }

  updateMapView() {
    const view = this.map.getView();
    const extent = view.calculateExtent(this.map.getSize());
    // const bottomLeft = toLonLat(getBottomLeft(extent));
    // const topRight = toLonLat(getTopRight(extent));
    const mapView: MapView = {
      zoom: view.getZoom(),
      center: view.getCenter(),
      extent: extent
    };

    this.updateBrowserLocation(mapView);
    this.searchService.updateMapView(mapView);
  }

  updateBrowserLocation(mapView: MapView) {
    const queryParamsObj = {
      lat: mapView.center[0],
      lon: mapView.center[1],
      zoom: mapView.zoom
    };

    // https://stackoverflow.com/questions/35618463/change-route-params-without-reloading-in-angular-2
    this.location.replaceState(
      this.router
        .createUrlTree(
          [this.locationStrategy.path().split('?')[0]], // Get uri
          { queryParams: queryParamsObj } // Pass all parameters inside queryParamsObj
        )
        .toString()
    );
  }

  jumpToLocation() {
    const lat = this.route.snapshot.queryParamMap.get('lat');
    const lon = this.route.snapshot.queryParamMap.get('lon');
    const zoom = this.route.snapshot.queryParamMap.get('zoom');

    if (lat && lon && zoom) {
      this.map.getView().setZoom(zoom);
      this.map.getView().setCenter([lat, lon]);
      this.locationRetrieved = true; // do not jump to location if we have the setting
    }
  }

  retrieveLocation() {
    // https://openlayers.org/en/latest/examples/geolocation.html
    // @TODO implement feature of location
    const geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      tracking: true,
      projection: this.map.getView().getProjection()
    });
    geolocation.on('change:position', () => {
      console.log(geolocation.getPosition());
      if (!this.locationRetrieved) {
        const coordinates = geolocation.getPosition();
        if (
          geolocation.getPosition() &&
          geolocation.getPosition()[0] &&
          geolocation.getPosition()[1]
        ) {
          this.map.getView().setZoom(16);
          this.map.getView().setCenter(coordinates);
          this.locationRetrieved = true;
        }
      }
    });
  }

  wrapLon(value) {
    const worlds = Math.floor((value + 180) / 360);
    return value - worlds * 360;
  }

  toFeature(richFeature: any, top = true) {
    const iconFeature = new Feature({
      // https://stackoverflow.com/questions/26967638/convert-point-to-lat-lon
      geometry: new Point(
        olProj.transform(richFeature.lonLat, 'EPSG:4326', 'EPSG:3857')
      ),
      id: 0
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, top ? 1.0 : 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale:
          this.map && this.map.getView().getZoom()
            ? this.map.getView().getZoom() < 14
              ? 0.5
              : 1
            : 1,
        src:
          'https://www.churchillretirement.co.uk/themes/churchill/images/map-marker-poi.png' // 'http://www.free-icons-download.net/images/small-dump-truck-icon-44006.png'
      })
    });

    iconFeature.setStyle(iconStyle);
    return iconFeature;
  }

  retrieveData() {
    this.vectorSource.clear();
    this.vectorSource.addFeature(this.toFeature({ lonLat: [26.057, 44.43] }));
  }

  initMousePosition() {
    this.mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      undefinedHTML: '&nbsp;'
    });
  }

  addNewPOI(mouseEvent) {
    const mapEvent = {
      clientX: mouseEvent.center.x,
      clientY: mouseEvent.center.y
    };

    // PluggableMap getEventPixel
    const viewportPosition = this.map.viewport_.getBoundingClientRect();
    const eventPixel = [
      mapEvent.clientX - viewportPosition.left,
      mapEvent.clientY - viewportPosition.top
    ];

    const coordinateMap = this.map.getCoordinateFromPixelInternal(eventPixel);
    const coordinate = olProj.transform(
      coordinateMap,
      'EPSG:3857',
      'EPSG:4326'
    );

    this.editRichFeature = { lonLat: coordinate };

    this.editReplace();
  }

  editReplace() {
    this.editVectorSource.clear();
    if (this.editRichFeature) {
      this.editVectorSource.addFeature(this.toFeature(this.editRichFeature));
    }
  }

  initEditTransform() {
    // https://github.com/Viglino/ol-ext/blob/master/examples/interaction/map.interaction.transform.html
    // https://openlayers.org/en/latest/examples/custom-interactions.html
    const interaction = new Translate({
      layers: [this.editVectorLayer],
      hitTolerance: 2
    });
    this.map.addInteraction(interaction);

    const startPosition = { pixel: [0, 0] };
    interaction.on('translatestart', e => {
      startPosition.pixel = e.mapBrowserEvent.pixel;
    });

    interaction.on('translateend', e => {
      if (
        Math.abs(e.mapBrowserEvent.pixel[0] - startPosition.pixel[0]) > 2 ||
        Math.abs(e.mapBrowserEvent.pixel[1] - startPosition.pixel[1]) > 2
      ) {
        const coordinate = olProj.transform(
          e.coordinate,
          'EPSG:3857',
          'EPSG:4326'
        );

        this.editRichFeature = { lonLat: coordinate };
        this.editReplace();
      }
    });
  }

  initPopUp() {
    const element = document.getElementById('popup');

    this.popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -34] // @TODO based on scale
    });
    this.map.addOverlay(this.popup);

    // display popup on click
    this.map.on('click', evt => {
      this.userInteraction = [];
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, feat => {
        return feat;
      });
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        this.popup.setPosition(coordinates);
        this.popupHidden = false;
      } else {
        this.popupHidden = true;
      }
    });
    // // change mouse cursor when over marker
    // this.map.on('pointermove', (e) => {
    //   if (e.dragging) {
    //     element.popover('destroy');
    //     return;
    //   }
    //   const pixel = this.map.getEventPixel(e.originalEvent);
    //   const hit = this.map.hasFeatureAtPixel(pixel);
    //   this.map.getTarget().style.cursor = hit ? 'pointer' : '';
    // });
  }

  popupEvent() {}

  initSearchOverlay() {
    const element = document.getElementById('search-bar');

    const searchBar = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [25, 25]
    });
    this.map.addOverlay(searchBar);
  }
}
