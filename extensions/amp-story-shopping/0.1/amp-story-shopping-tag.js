import * as Preact from '#core/dom/jsx';
import {Layout_Enum} from '#core/dom/layout';
import {computedStyle} from '#core/dom/style';

import {Services} from '#service';

import {formatI18nNumber, loadFonts} from './amp-story-shopping';

import {CSS as shoppingTagCSS} from '../../../build/amp-story-shopping-tag-0.1.css';
import {
  Action,
  ShoppingConfigDataDef,
  ShoppingDataDef,
  StateProperty,
} from '../../amp-story/1.0/amp-story-store-service';
import {createShadowRootWithStyle} from '../../amp-story/1.0/utils';

/** @const {!Array<!Object>} fontFaces */
const FONTS_TO_LOAD = [
  {
    family: 'Poppins',
    weight: '400',
    src: "url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2')",
  },
  {
    family: 'Poppins',
    weight: '700',
    src: "url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2) format('woff2')",
  },
];

export class AmpStoryShoppingTag extends AMP.BaseElement {
  /** @param {!AmpElement} element */
  constructor(element) {
    super(element);
    /** @private @const {?../../amp-story/1.0/amp-story-store-service.AmpStoryStoreService} */
    this.storeService_ = null;

    /** @private {?../../../src/service/localization.LocalizationService} */
    this.localizationService_ = null;

    /** @param {boolean} element */
    this.hasAppendedInnerShoppingTagEl_ = false;

    /** @param {!ShoppingConfigDataDef} tagData */
    this.tagData_ = null;
  }

  /** @override */
  buildCallback() {
    loadFonts(this.win, FONTS_TO_LOAD);
    this.element.setAttribute('role', 'button');

    return Promise.all([
      Services.storyStoreServiceForOrNull(this.win),
      Services.localizationServiceForOrNull(this.element),
    ]).then(([storeService, localizationService]) => {
      this.storeService_ = storeService;
      this.localizationService_ = localizationService;
    });
  }

  /** @override */
  layoutCallback() {
    this.storeService_.subscribe(
      StateProperty.SHOPPING_DATA,
      (shoppingData) => this.createAndAppendInnerShoppingTagEl_(shoppingData),
      true /** callToInitialize */
    );

    this.storeService_.subscribe(StateProperty.RTL_STATE, (rtlState) => {
      this.onRtlStateUpdate_(rtlState);
    });

    this.storeService_.subscribe(
      StateProperty.PAGE_SIZE,
      (pageSizeState) => {
        this.flipTagIfOffscreen_(pageSizeState);
      },
      true /** callToInitialize */
    );
  }

  /**
   * Helper function to check if the shopping tag should flip if it's too far to the right.
   * We only check the right hand side, as resizing only expands the border to the right.
   * @param {!Object} pageSize
   * @private
   */
  flipTagIfOffscreen_(pageSize) {
    const storyPageWidth = pageSize.width;

    let shouldFlip;

    this.measureMutateElement(
      () => {
        /*
         * We are using offsetLeft and offsetWidth instead of getLayoutBox() because
         * the correct measurements are not taken into account when using a CSS transform (such as translate),
         * which we are using in the i-amphtml-amp-story-shopping-tag-inner-flipped class.
         */
        const {offsetLeft, offsetWidth} = this.element;
        shouldFlip = offsetLeft + offsetWidth > storyPageWidth;
      },
      () => {
        this.shoppingTagEl_.classList.toggle(
          'i-amphtml-amp-story-shopping-tag-inner-flipped',
          shouldFlip
        );

        const dotEl = this.shoppingTagEl_.querySelector(
          '.i-amphtml-amp-story-shopping-tag-dot'
        );

        dotEl.classList.toggle(
          'i-amphtml-amp-story-shopping-tag-dot-flipped',
          shouldFlip
        );

        this.shoppingTagEl_.classList.toggle(
          'i-amphtml-amp-story-shopping-tag-visible',
          true
        );
      }
    );
  }

  /**
   * Reacts to RTL state updates and triggers the UI for RTL.
   * @param {boolean} rtlState
   * @private
   */
  onRtlStateUpdate_(rtlState) {
    this.mutateElement(() => {
      rtlState
        ? this.shoppingTagEl_.setAttribute('dir', 'rtl')
        : this.shoppingTagEl_.removeAttribute('dir');
    });
  }

  /**
   * @private
   */
  onClick_() {
    this.storeService_.dispatch(Action.ADD_SHOPPING_DATA, {
      'activeProductData': this.tagData_,
    });
  }

  /** @override */
  isLayoutSupported(layout) {
    return layout === Layout_Enum.CONTAINER;
  }

  /**
   * This function counts the number of lines in the shopping tag
   * and sets the styling properties dynamically based on the number of lines.
   * @private
   */
  styleTagText_() {
    const pillEl = this.element.shadowRoot?.querySelector(
      '.amp-story-shopping-tag-pill'
    );

    const textEl = this.element.shadowRoot?.querySelector(
      '.amp-story-shopping-tag-pill-text'
    );

    if (!pillEl || !textEl) {
      return;
    }

    const fontSize = parseInt(
      computedStyle(window, textEl).getPropertyValue('font-size'),
      10
    );
    const ratioOfLineHeightToFontSize = 1.5;
    const lineHeight = Math.floor(fontSize * ratioOfLineHeightToFontSize);
    const height = textEl./*OK*/ clientHeight;
    const numLines = Math.ceil(height / lineHeight);

    this.mutateElement(() => {
      pillEl.classList.toggle(
        'i-amphtml-amp-story-shopping-tag-pill-multi-line',
        numLines > 1
      );
    });
  }

  /**
   * @return {!Element}
   * @private
   */
  renderShoppingTagTemplate_() {
    return (
      <div
        class="i-amphtml-amp-story-shopping-tag-inner"
        role="button"
        onClick={() => this.onClick_()}
      >
        <span class="i-amphtml-amp-story-shopping-tag-dot"></span>
        <span class="i-amphtml-amp-story-shopping-tag-pill">
          <span
            class="i-amphtml-amp-story-shopping-tag-pill-image"
            style={
              this.tagData_['productIcon'] && {
                backgroundImage:
                  'url(' + this.tagData_['productIcon'] + ') !important',
                backgroundSize: 'cover !important',
              }
            }
          ></span>
          <span class="i-amphtml-amp-story-shopping-tag-pill-text">
            {(this.tagData_['productTagText'] && (
              <span class="i-amphtml-amp-story-shopping-product-tag-text">
                {this.tagData_['productTagText']}
              </span>
            )) ||
              formatI18nNumber(
                this.localizationService_,
                this.element,
                this.tagData_['productPriceCurrency'],
                this.tagData_['productPrice']
              )}
          </span>
        </span>
      </div>
    );
  }

  /**
   * @param {!ShoppingDataDef} shoppingData
   * @private
   */
  createAndAppendInnerShoppingTagEl_(shoppingData) {
    this.tagData_ = shoppingData[this.element.getAttribute('data-product-id')];
    if (this.hasAppendedInnerShoppingTagEl_ || !this.tagData_) {
      return;
    }

    this.onRtlStateUpdate_(this.storeService_.get(StateProperty.RTL_STATE));
    this.shoppingTagEl_ = this.renderShoppingTagTemplate_();

    this.measureMutateElement(
      () => {
        createShadowRootWithStyle(
          this.element,
          this.shoppingTagEl_,
          shoppingTagCSS
        );
        this.hasAppendedInnerShoppingTagEl_ = true;
      },
      () => {
        this.styleTagText_();
      }
    );
  }
}
