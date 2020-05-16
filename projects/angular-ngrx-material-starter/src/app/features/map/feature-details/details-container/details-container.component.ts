import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Injector,
  ApplicationRef,
  Type,
  Inject,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { DetailContainerDirective } from '../detail-container.directive';
import { DetailsParam } from '../interfaces/details-param';
import { DetailsConstructorParams } from '../interfaces/details-constructor-params';
import { DetailsComponent } from '../interfaces/details-component';
import { NewFeatureComponent } from '../../feature-details-components/new-feature/new-feature.component';
import { ComponentMap, DYNAMIC_COMPONENT_MAP } from '../details-component-map';
import { Subscription } from 'rxjs';
import { DynamicEvent } from '../interfaces/dynamic-event';

@Component({
  selector: 'anms-feature-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  detailsConstructorParams: DetailsConstructorParams;

  @ViewChild(DetailContainerDirective, { static: true })
  detailsHost: DetailContainerDirective;

  private subscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DYNAMIC_COMPONENT_MAP) public componentMap: ComponentMap
  ) {}

  ngOnInit(): void {
    if (this.detailsConstructorParams) {
      this.load(this.detailsConstructorParams);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes.detailsConstructorParams &&
      changes.detailsConstructorParams.currentValue
    ) {
      this.load(changes.detailsConstructorParams.currentValue);
    }
  }

  private load(constructorParams: DetailsConstructorParams) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentMap[constructorParams.component]
    );

    const viewContainerRef = this.detailsHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<DetailsComponent>componentRef.instance).params = constructorParams.params;
  }

  ngOnDestroy() {}
}
