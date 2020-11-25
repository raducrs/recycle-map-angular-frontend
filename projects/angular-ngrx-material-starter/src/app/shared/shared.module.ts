import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faCircle,
  faDotCircle,
  faHighlighter,
  faHandHoldingHeart,
  faRecycle,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faTruckLoading,
  faUserNinja,
  faShoppingCart,
  faIndustry,
  faQuestion,
  faFlagCheckered,
  faUserCircle,
  faUserPlus,
  faAngleLeft,
  faAngleRight,
  faMapMarkedAlt,
  faArrowAltCircleRight,
  faMapMarkerAlt,
  faLessThan,
  faGreaterThan,
  faChevronLeft,
  faChevronRight,
  faReply,
  faSortNumericDown,
  faSortAmountDown,
  faSortAlphaDown,
  faSort, faForward, faListUl
} from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faGithub } from '@fortawesome/free-brands-svg-icons';

import { BigInputComponent } from './big-input/big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action/big-input-action.component';
import { RtlSupportDirective } from './rtl-support/rtl-support.directive';
import { DynamicScriptService } from './dynamic-script/dynamic-script.service';
import {
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig
} from '@angular/platform-browser';
import { LongDirectiveConfigService } from './directives/long-directive-config.service';
import { LongPressDirective } from './directives/long-press.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as Hammer from 'hammerjs';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { LayoutComponent } from './layout/layout.component';
import { Layout2Component } from './layout2/layout2.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatExpansionModule,
    MatRadioModule,

    FontAwesomeModule
  ],
  declarations: [
    BigInputComponent,
    BigInputActionComponent,
    RtlSupportDirective,
    LongPressDirective,
    LayoutComponent,
    Layout2Component
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatExpansionModule,
    MatRadioModule,

    FontAwesomeModule,

    BigInputComponent,
    BigInputActionComponent,
    RtlSupportDirective,

    LongPressDirective,
    LayoutComponent,
    Layout2Component
  ],
  providers: [
    DynamicScriptService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: LongDirectiveConfigService },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faMediumM,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook,
      faTimes,
      faPlus,
      faCircle,
      faDotCircle,
      faHighlighter,
      faHandHoldingHeart,
      faRecycle,
      faAngleDoubleRight,
      faAngleDoubleLeft,
      faUserNinja,
      faShoppingCart,
      faIndustry,
      faQuestion,
      faFlagCheckered,
      faUserCircle,
      faUserPlus,
      faAngleLeft,
      faAngleRight,
      faMapMarkedAlt,
      faArrowAltCircleRight,
      faMapMarkerAlt,
      faAngleDoubleRight,
      faChevronLeft,
      faChevronRight,
      faReply,
      faListUl,
      faSortAlphaDown,
      faSortNumericDown,
      faSortAmountDown,
      faSort,
      faFilter
    );
  }
}
