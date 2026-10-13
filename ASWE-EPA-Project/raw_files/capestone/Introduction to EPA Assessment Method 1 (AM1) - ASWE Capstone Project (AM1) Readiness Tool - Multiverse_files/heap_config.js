!function(){var SERVER_SIDE_CONFIG={"privacy":{"disableTextCapture":false,"enableSecureCookies":true},"compressCookies":false,"salesforceAura":false,"supportedDomains":["multiverse.io","platform.multiverse.io","my.multiverse.io","login.multiverse.io"],"replaySettings":{},"integrations":[{"name":"contentsquare","fn":function integration(dependencyContainer) {
  var HASHED_CS_PROJ_ID='1a2aae8160437';
  var SOURCE_NAME = 'contentsquare';

  function loadCsLiteScript() {
    window._uxa = window._uxa || [];
    var mt = document.createElement('script');
    mt.type = 'text/javascript';
    mt.async = true;
    mt.src = 'https://t.contentsquare.net/uxa/' + HASHED_CS_PROJ_ID + '.js';
    document.getElementsByTagName('head')[0].appendChild(mt);
  }

  function isCsLiteMetadataPresent() {
    var csMetadata;
    if (window._uxa && window._uxa.push) {
      csMetadata = window._uxa.push(['getSessionData']);
    }
    return csMetadata && csMetadata.projectId;
  }

  function csLiteLoadedTimer() {
    if (isCsLiteMetadataPresent()) {
      clearTimerAndLoad();
    }
  }

  function clearTimerAndLoad() {
    clearInterval(csLiteLoaded);
    dependencyContainer.markAdapterAsResolved(SOURCE_NAME);
  }

  try {
    if (isCsLiteMetadataPresent()) {
      dependencyContainer.markAdapterAsResolved(SOURCE_NAME);
      return;
    }

    if (HASHED_CS_PROJ_ID) {
      loadCsLiteScript();
    }

    var csLiteLoaded = setInterval(csLiteLoadedTimer, 100);
    setTimeout(clearTimerAndLoad, 3000);
    //eslint-disable-next-line no-empty
  } catch (e) {}
},"config":{"isBlocking":true,"blockDurationInMs":5000}}],"snapshots":{"click":{"section.swiper-wrapper":{"a":{},"j":{},"f":{},"st":{},"ex":{},"t":{"H2":"<h2>"}},"div.accordion button":{"j":{},"f":{},"t":{"TooltipTitle":".title"}},"button.button-primary":{"j":{},"f":{},"t":{"Number of apprentices transferred":"card__action-result-title"}},"section.programme-carousel":{"a":{},"j":{},"f":{},"st":{},"ex":{},"t":{"H2":"<h2>"}},"section.cta-card":{"a":{},"j":{},"f":{},"st":{},"ex":{},"t":{"H2":"<h2>"}},"section.employers-cta":{"a":{},"j":{},"f":{},"st":{},"ex":{},"t":{"H2":"<h2>"}},".page-content .profile div.profile__section-wrapper":{"j":{},"f":{},"t":{"Section Title":"h3.profile__section-title"}},"[aria-label=\"View Data – Created 30 Aug 2023 form\"]":{"j":{},"f":{},"t":{"Date Created of Form":"div"}},".job__container .wh-modal__content .fa-times":{"j":{},"f":{},"t":{"Modal title":".job__container  .wh-modal__title"}},".job__container .wh-modal__content .button-primary":{"j":{},"f":{},"t":{"Modal title":".job__container .wh-modal__title"}},".job__container .wh-modal__content .button-text":{"j":{},"f":{},"t":{"Modal title":".job__container .wh-modal__title"}},"a.tracking-nav__link.isActive.css-g8ywge.e180bdff1":{"j":{},"f":{},"t":{"Navigation item":""}},"a.tracking-nav*":{"j":{},"f":{},"t":{"Navigation item":"aria-label"}},"section.cta-banner":{"a":{},"j":{},"f":{},"st":{},"ex":{},"t":{"H2":"<h2>"}}},"submit":{"form[action=\"/us/candidate/basic-info\"]":{"j":{},"f":{},"t":{"Resident State (US)":".edd-head .edd-value"}}},"change":{"#email-address-fields_email":{"j":{},"f":{},"t":{"Form field error":".form-field-error"}}},"pageview":{"*":{"j":{"Screen resolution":function execute() { return window.screen.width + ' x ' + window.screen.height},"Scroll":function execute() { return (function() {
    var quarters = 0;
    var scrollHeight, quarterHeight, scrollDistance, divisible, scrollPercent;
    document.addEventListener("scroll", function() {
        scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        quarterHeight = scrollHeight / 4;
        scrollDistance = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        divisible = Math.trunc(scrollDistance / quarterHeight);
        if (quarters < divisible && divisible !== Infinity) {
            scrollPercent = divisible * 25;
            heap.track('Scroll Depth', {
                percent: scrollPercent
            });
            quarters++;
        }
    });
}());}},"f":{},"s":{"Blog category":".post-page-hero a"},"a":{},"st":{},"ex":{}}}},"sdk":{"version":"5.3.17","isExperimentalVersion":false,"domain":"https://cdn.us.heap-api.com","plugins":[]},"ingestServer":"https://c.us.heap-api.com","appServer":"https://heapanalytics.com","csSettings":{"csProjectId":"94584","csHashedProjId":"1a2aae8160437","heapTagStatus":"heap_sideloads_cs"}};function t(e){var n;return-1===e.indexOf('core')&&e.push('core'),e.sort(function(e,n){return e<n?-1:n<e?1:0}).join('-')}function i(){var e=t(SERVER_SIDE_CONFIG.sdk.plugins||[]),n=heap&&heap.clientConfig&&heap.clientConfig.sdk||{},i=n.domain||SERVER_SIDE_CONFIG.sdk.domain,o=encodeURIComponent(n.version||SERVER_SIDE_CONFIG.sdk.version),r;return i+'/v5/'+(n.version||!SERVER_SIDE_CONFIG.sdk.isExperimentalVersion?'heapjs-static':'heapjs-experimental')+'/'+o+'/'+e+'/heap.js'}function e(){var e=i(),n=document.createElement('script');n.type='text/javascript',n.src=e,n.async=!0;var e=document.getElementsByTagName('script')[0];e.parentNode.insertBefore(n,e)}window.heap.serverConfig=SERVER_SIDE_CONFIG,window.heap.init(window.heap.envId,window.heap.clientConfig,window.heap.serverConfig),e()}();