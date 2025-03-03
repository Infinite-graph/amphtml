import {parseJson} from '#core/types/object/json';

/**
 * A unique identifier for each localized string.  Localized string IDs should:
 *
 *   - Maintain alphabetical order, by component
 *   - Be prefixed with the name of the extension that uses the string
 *     (e.g. "AMP_STORY_"), or with "AMP_" if they are general
 *   - NOT be reused; to deprecate an ID, comment it out and prefix its key with
 *     the string "DEPRECATED_"
 *
 * Next ID: 103
 *
 * @const @enum {string}
 */
export const LocalizedStringId_Enum = {
  // amp-story
  AMP_STORY_ACTIVATE_BUTTON_TEXT: '83',
  AMP_STORY_AUDIO_MUTE_BUTTON_LABEL: '66',
  AMP_STORY_AUDIO_UNMUTE_BUTTON_LABEL: '67',
  AMP_STORY_CLOSE_BUTTON_LABEL: '87',
  AMP_STORY_CONSENT_ACCEPT_BUTTON_LABEL: '22',
  AMP_STORY_CONSENT_DECLINE_BUTTON_LABEL: '23',
  AMP_STORY_CONTINUE_ANYWAY_BUTTON_LABEL: '27',
  AMP_STORY_DISCOVERY_DIALOG_TEXT: '96',
  AMP_STORY_DOMAIN_DIALOG_HEADING_LABEL: '25',
  AMP_STORY_DOMAIN_DIALOG_HEADING_LINK: '26',
  AMP_STORY_EDUCATION_NAVIGATION_SWIPE_PROGRESS: '78',
  AMP_STORY_EDUCATION_NAVIGATION_SWIPE_INSTRUCTIONS: '79',
  AMP_STORY_EDUCATION_NAVIGATION_SWIPE_DISMISS: '80',
  AMP_STORY_EDUCATION_NAVIGATION_TAP_PROGRESS: '75',
  AMP_STORY_EDUCATION_NAVIGATION_TAP_PROGRESS_SINGLE: '81',
  AMP_STORY_EDUCATION_NAVIGATION_TAP_INSTRUCTIONS: '76',
  AMP_STORY_EDUCATION_NAVIGATION_TAP_DISMISS: '77',
  AMP_STORY_HAS_NEW_PAGE_TEXT: '64',
  AMP_STORY_FORM_SUBMIT_ERROR: '98',
  AMP_STORY_FORM_SUBMIT_SUCCESS: '99',
  AMP_STORY_HINT_UI_NEXT_LABEL: '2',
  AMP_STORY_HINT_UI_PREVIOUS_LABEL: '3',
  AMP_STORY_INFO_BUTTON_LABEL: '68',
  AMP_STORY_NEXT_PAGE: '91',
  AMP_STORY_NEXT_STORY: '90',
  AMP_STORY_OPEN_OUTLINK_TEXT: '97',
  AMP_STORY_PAGE_ATTACHMENT_OPEN_LABEL: '35',
  AMP_STORY_PAGE_ERROR_VIDEO: '65',
  AMP_STORY_PAGE_PLAY_VIDEO: '34',
  AMP_STORY_PAUSE_BUTTON_LABEL: '85',
  AMP_STORY_PLAY_BUTTON_LABEL: '86',
  AMP_STORY_PREVIOUS_PAGE: '93',
  AMP_STORY_REPLAY: '92',
  AMP_STORY_SHARE_BUTTON_LABEL: '69',
  AMP_STORY_SHARING_CLIPBOARD_FAILURE_TEXT: '4',
  AMP_STORY_SHARING_CLIPBOARD_SUCCESS_TEXT: '5',
  AMP_STORY_SHARING_PROVIDER_NAME_EMAIL: '6',
  AMP_STORY_SHARING_PROVIDER_NAME_FACEBOOK: '7',
  AMP_STORY_SHARING_PROVIDER_NAME_LINE: '63',
  AMP_STORY_SHARING_PROVIDER_NAME_LINK: '9',
  AMP_STORY_SHARING_PROVIDER_NAME_LINKEDIN: '10',
  AMP_STORY_SHARING_PROVIDER_NAME_PINTEREST: '11',
  AMP_STORY_SHARING_PROVIDER_NAME_SMS: '12',
  AMP_STORY_SHARING_PROVIDER_NAME_TUMBLR: '14',
  AMP_STORY_SHARING_PROVIDER_NAME_TWITTER: '15',
  AMP_STORY_SHARING_PROVIDER_NAME_WHATSAPP: '16',
  AMP_STORY_SKIP_TO_NEXT_BUTTON_LABEL: '88',
  AMP_STORY_WARNING_UNSUPPORTED_BROWSER_TEXT: '21',

  // amp-story-auto-ads
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_APPLY_NOW: '39',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_BOOK_NOW: '40',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_BUY_TICKETS: '41',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_DOWNLOAD: '42',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_EXPLORE: '43',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_GET_NOW: '44',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_INSTALL: '45',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_LEARN_MORE: '46',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_LISTEN: '47',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_MORE: '48',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_OPEN_APP: '49',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_ORDER_NOW: '50',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_PLAY: '51',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_READ: '52',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_SHOP: '53',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_SHOW: '54',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_SHOWTIMES: '55',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_SIGN_UP: '56',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_SUBSCRIBE: '57',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_USE_APP: '58',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_VIEW: '59',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_WATCH: '60',
  AMP_STORY_AUTO_ADS_BUTTON_LABEL_WATCH_EPISODE: '61',

  // amp-story-interactive
  AMP_STORY_INTERACTIVE_DISCLAIMER_NOTE: '89',
  AMP_STORY_INTERACTIVE_RESULTS_SCORE: '84',
  AMP_STORY_INTERACTIVE_QUIZ_ANSWER_CHOICE_A: '71',
  AMP_STORY_INTERACTIVE_QUIZ_ANSWER_CHOICE_B: '72',
  AMP_STORY_INTERACTIVE_QUIZ_ANSWER_CHOICE_C: '73',
  AMP_STORY_INTERACTIVE_QUIZ_ANSWER_CHOICE_D: '74',

  // amp-story-shopping
  AMP_STORY_SHOPPING_CTA_LABEL: '101',
  AMP_STORY_SHOPPING_PLP_HEADER: '102',

  // DEPRECATED_AMP_STORY_EXPERIMENT_ENABLE_BUTTON_LABEL: '0',
  // DEPRECATED_AMP_STORY_EXPERIMENT_ENABLED_TEXT: '1',
  // DEPRECATED_AMP_STORY_CONSENT_DISMISS_DIALOG_BUTTON_LABEL: '24',
  // DEPRECATED_AMP_STORY_SYSTEM_LAYER_SHARE_WIDGET_LABEL: '17',
  // DEPRECATED_AMP_STORY_SHARING_PROVIDER_NAME_GOOGLE_PLUS: '8',
  // DEPRECATED_AMP_STORY_AUDIO_MUTE_BUTTON_TEXT: '31',
  // DEPRECATED_AMP_STORY_AUDIO_UNMUTE_SOUND_TEXT: '32',
  // DEPRECATED_AMP_STORY_AUDIO_UNMUTE_NO_SOUND_TEXT: '33',
  // DEPRECATED_AMP_STORY_PAGINATION_BUTTON_PREVIOUS_PAGE_LABEL: '82',
  // DEPRECATED_AMP_STORY_READ_MORE: '100',
  // DEPRECATED_AMP_STORY_SHARING_PAGE_LABEL: '62',
  // DEPRECATED_AMP_STORY_SHARING_PROVIDER_NAME_SYSTEM: '13',
  // DEPRECATED_AMP_STORY_TOOLTIP_EXPAND_TWEET: '36',
  // DEPRECATED_AMP_STORY_WARNING_DESKTOP_HEIGHT_SIZE_TEXT: '37',
  // DEPRECATED_AMP_STORY_WARNING_DESKTOP_SIZE_TEXT: '18',
  // DEPRECATED_AMP_STORY_WARNING_DESKTOP_WIDTH_SIZE_TEXT: '38',
  // DEPRECATED_AMP_STORY_WARNING_EXPERIMENT_DISABLED_TEXT: '19',
  // DEPRECATED_AMP_STORY_WARNING_LANDSCAPE_ORIENTATION_TEXT: '20',
  // DEPRECATED_AMP_STORY_SIDEBAR_BUTTON_LABEL: '70',
};

/**
 * @typedef {{
 *   string: string,
 *   description: string,
 * }}
 */
export let LocalizedStringDef;

/**
 * @typedef {!Object<!LocalizedStringId_Enum, !LocalizedStringDef>}
 */
export let LocalizedStringBundleDef;

/**
 * Creates a deep copy of the specified LocalizedStringBundle.
 * @param {!LocalizedStringBundleDef} localizedStringBundle
 * @return {!LocalizedStringBundleDef}
 */
function cloneLocalizedStringBundle(localizedStringBundle) {
  return /** @type {!LocalizedStringBundleDef} */ (
    parseJson(
      JSON.stringify(/** @type {!JsonObject} */ (localizedStringBundle))
    )
  );
}

/**
 * Creates a pseudo locale by applying string transformations (specified by the
 * localizationFn) to an existing string bundle, without modifying the original.
 * @param {!LocalizedStringBundleDef} localizedStringBundle The localized
 *     string bundle to be transformed.
 * @param {function(string): string} localizationFn The transformation to be
 *     applied to each string in the bundle.
 * @return {!LocalizedStringBundleDef} The new strings.
 */
export function createPseudoLocale(localizedStringBundle, localizationFn) {
  /** @type {!LocalizedStringBundleDef} */
  const pseudoLocaleStringBundle = cloneLocalizedStringBundle(
    localizedStringBundle
  );

  Object.keys(pseudoLocaleStringBundle).forEach((localizedStringIdAsStr) => {
    const localizedStringId = /** @type {!LocalizedStringId_Enum} */ (
      localizedStringIdAsStr
    );
    const entry = localizedStringBundle[localizedStringId];
    // In unminified builds, this is an object {"string": "foo", ...}.
    // In minified builds, this is the actual string "foo".
    pseudoLocaleStringBundle[localizedStringId] = localizationFn(
      entry['string'] || entry
    );
  });

  return pseudoLocaleStringBundle;
}
