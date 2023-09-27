// ==UserScript==
// @name        Amazon Sponsored Products remover
// @namespace   https://greasyfork.org/en/users/2755-robotoilinc
// @author      RobotOilInc
// @version     0.3.2
// @license     MIT
// @description Removes the terrible sponsored products from Amazon.
// @include     http*://www.amazon.cn/*
// @include     http*://www.amazon.in/*
// @include     http*://www.amazon.co.jp/*
// @include     http*://www.amazon.com.sg/*
// @include     http*://www.amazon.com.tr/*
// @include     http*://www.amazon.ae/*
// @include     http*://www.amazon.fr/*
// @include     http*://www.amazon.de/*
// @include     http*://www.amazon.it/*
// @include     http*://www.amazon.nl/*
// @include     http*://www.amazon.es/*
// @include     http*://www.amazon.co.uk/*
// @include     http*://www.amazon.ca/*
// @include     http*://www.amazon.com.mx/*
// @include     http*://www.amazon.com/*
// @include     http*://www.amazon.com.au/*
// @include     http*://www.amazon.com.br/*
// @include     http*://smile.amazon.com/*
// @icon        https://i.imgur.com/LGHKHEs.png
// @run-at      document-body
// ==/UserScript==

new MutationObserver(function(mutationList, observer) {
    // Remove old style sponsored results
    document.querySelectorAll('[data-component-type="sp-sponsored-result"]').forEach(function(element) {
        var parent = element.closest('[data-asin]');
        if(parent) parent.remove();
    });

    // Remove old style carousel ads
    document.querySelectorAll('.sp_desktop_sponsored_label').forEach(function(element) {
        var parent = element.closest('.a-carousel-container');
        if(parent) parent.remove();
    });

    // Remove all skyscraper ads (Amazon.de, shown on desktop on the left and bottom)
    document.querySelectorAll('[class*="_adPlacements"]').forEach(function(element) {
        element.remove();
    });
    document.querySelectorAll('[data-cel-widget*="adplacements"]').forEach(function(element) {
        element.remove();
    });

    // Remove advertising promo on product page
    document.querySelectorAll('[data-cel-widget="dp-ads-center-promo_feature_div"]').forEach(function(element) {
        element.remove();
    });

    // Remove all additional sponsored products
    document.querySelectorAll('.AdHolder').forEach(function(element) {
        element.remove();
    });

    // Remove ads in certain pages (Amazon.de, progress-tracker/package)
    document.querySelectorAll('[class*="spSponsored"]').forEach(function(element) {
        element.closest('#recsWidget').remove();
    });

    // Remove everything cluttering the search view (except pagination)
    document.querySelectorAll('#search .s-result-list.s-search-results > div:not([data-component-type="s-search-result"])').forEach(function(element) {
        if(element.querySelectorAll('.s-pagination-strip').length == 0) element.remove();
    });
}).observe(document.body, { childList: true, subtree: true });
