define(['common', 'jqueryui', 'custom', 'swiperInit'], function (common, jqueryui, custom, swiper) {
    // JS For Drop Down
    if (window.location.pathname == '/cricket') {
        $(".custom-select").each(function () {
            var classes = $(this).attr("class"),
                id = $(this).attr("id"),
                name = $(this).attr("name");
            var template = '<div class="' + classes + '">';
            template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
            template += '<div class="custom-options htImpressionTracking">';
            $(this).find("option").each(function () {
                let index = parseInt($(this).attr("index"), 0) + 1;
                let selectedClass = $(this).hasClass("selection") ? "selection" : "";
                template += '<span data-vars-storyid="' + $(this).attr("value") + '" data-vars-orderid="' + index + '" data-vars-story-url="' + $(this).html() + '" onclick="ga(\'send\', \'event\', \'cricket dropdown\', \'drpTournamentSelect\', \'' + $(this).html() + '\');" class="custom-option track' + selectedClass + '" id="' + $(this).attr("value") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
            });
            template += '</div></div>';

            $(this).wrap('<div class="custom-select-wrapper htImpressionTrackingTopCricket" data-vars-page-type="Cricket Page" data-vars-widget-name="Tournament Drop Down" data-vars-placement-number="1"></div>');
            $(this).hide();
            $(this).after(template);
        });
    } else {
        $(".custom-select").each(function () {
            var classes = $(this).attr("class"),
                id = $(this).attr("id"),
                name = $(this).attr("name");
            var template = '<div class="' + classes + '">';
            template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
            template += '<div class="custom-options">';
            $(this).find("option").each(function () {
                let selectedClass = $(this).hasClass("selection") ? "selection" : "";
                template += '<span class="custom-option ' + selectedClass + '" id="' + $(this).attr("value") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
            });
            template += '</div></div>';

            $(this).wrap('<div class="custom-select-wrapper"></div>');
            $(this).hide();
            $(this).after(template);
        });
    }
    $(".custom-option:first-of-type").hover(function () {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function () {
        $('html').one('click', function () {
            $(".custom-select").removeClass("opened");
        });
        // $(this).parents().find(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });

    $(".custom-option").on("click", function () {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
        if ($("#drpT20Schedule2022").length > 0) {
            bindUpcomingResult($(this).text());
        }
    });

    $("#sources-stats").parent().find(".custom-options").each(function (i, el) {
        let selectedOption = $(".ldrBoard").attr("data-option");
        $(".custom-select-trigger").html($("#" + selectedOption).text());
        if (selectedOption != "mostRuns") {
            $("#mostRuns_table").hide();
        }
        $("#" + selectedOption + "_table").show();
        $("#" + selectedOption).addClass("selection");
        if (selectedOption == "highestTeamTotal" || selectedOption == "lowestTeamTotal") {
            $(this).parents(".ldrBoard").removeClass("playerBoard");
        }
        $(el).on('click', function (e) {
            let value = e.target.id;
            $(".cwgTbl").each(function (i, elm) { $(elm).hide(); });
            if (value == "highestTeamTotal" || value == "lowestTeamTotal") {
                $(this).parents(".ldrBoard").removeClass("playerBoard");
            } else {
                $(this).parents(".ldrBoard").addClass("playerBoard");
            }
            $("#" + value + "_table").show();
            let selectedValue = $("#" + value + "_table").find(".widgetHead").text();
            ga('send', 'event', 'T20 World Cup', 'Leader Board', selectedValue);
        });
    });

    $("#drpCricket").parent().find(".custom-select").each(function (i, el) {
        $(el).on('click', function (e) {
            var tourId = e.target.id.toLowerCase();
            swiper.filterCricketSlide('tour_' + tourId);
        });
    });

    // try {
    //     if ($(".elFilters").length > 0) {
    //         var resultValue = 'all';
    //         var partyValue = 'all';

    //         $("#drpParty").parent().find(".custom-select").each(function (i, el) {
    //             $(el).on('click', function (e) {
    //                 partyValue = e.target.id.toLowerCase();
    //                 getKeyCandidates();
    //             });
    //         });

    //         $("#drpResult").parent().find(".custom-select").each(function (i, el) {
    //             $(el).on('click', function (e) {
    //                 resultValue = e.target.id.toLowerCase();
    //                 getKeyCandidates();
    //             });
    //         });

    //         function getKeyCandidates() {
    //             $.ajax({
    //                 url: "https://www.hindustantimes.com/feed-elections/10s/2022-03/keycandidates-2022.json",
    //                 dataType: "json",
    //                 success: function (res) {
    //                     var finalLi = '';
    //                     var list = '';
    //                     res[keyCandidate_state]['key-candidate'].forEach(function (elm) {
    //                         var to_show = true;
    //                         if (resultValue != 'all')
    //                             if (resultValue != elm.win_status_eng.toLowerCase())
    //                                 to_show = false;

    //                         if (to_show && partyValue != 'all')
    //                             if (partyValue != elm['party-initials'].toLowerCase())
    //                                 to_show = false;


    //                         var candidateLink = pageUrl + "/" + elm.candidate_name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "");
    //                         if (to_show) {
    //                             var lix = '<li>';
    //                             lix += '<div class="nameDetail">';
    //                             lix += '<div class="cImg"><img src="' + elm.candidate_img + '" alt="' + elm.candidate_name + '?1"></div>';
    //                             lix += '<div class="cInfo">';
    //                             if (elm['education'] != 'NA')
    //                                 lix += '<span class="name"><a href="' + candidateLink + '">' + elm.candidate_name + '</a></span>';
    //                             else
    //                                 lix += '<span class="name">' + elm.candidate_name + '</span>';

    //                             lix += '<span class="partyName"><small>' + elm['party-initials'] + '</small><small>' + elm.ac + '</small></span>';
    //                             lix += '</div>';
    //                             lix += '</div>';
    //                             if (elm.win_status_eng != '')
    //                                 lix += '<div class="candiStatus"><img src="https://www.hindustantimes.com/static-content/1y/2021/' + elm.win_status_eng.toLowerCase() + '-icon.svg" alt=""></div>';
    //                             lix += '</li>';
    //                             finalLi += lix;
    //                         }
    //                     });
    //                     $('#ulKeyCandidates').html(finalLi);
    //                 }
    //             });
    //         }
    //         getKeyCandidates();
    //         setInterval(() => {
    //             setInterval(getKeyCandidates());
    //         }, 30000);

    //     }
    // } catch { }


    if (window.location.pathname == '/cricket') {
        function fireGAClickTrackingCricket(widgetName, pageType, placementNumber, pageUrl, id, storyUrl, position, backFill) {
            console.log('Click Tracking Code Fired');
            var Obj = {
                'event': 'promoClick',
                'widgetName': widgetName,
                'pageType': pageType,
                'placementNumber': placementNumber,
                'backFill': backFill,
                'pageUrl': pageUrl,
                'ecommerce': {
                    'promoClick': {
                        'promotions': [{
                            'id': id,
                            'name': widgetName,
                            'creative': storyUrl,
                            'position': position
                        }]
                    }
                }
            };
            dataLayer.push(Obj);
            return true;
        }


        var eventFired = false;

        function fireGAImpressionTrackingCricket() {
            var storyElem = document.querySelectorAll(".htImpressionTrackingTopCricket");
            storyElem.forEach(function (item, i) {
                var pageType = 'section page';

                if ($(item).isInViewport() || eventFired === false) {
                    eventFired = true;
                    if (!item.classList.contains("eventFired")) {
                        let widget = $(item).nextAll('.htImpressionTracking:first');
                        let widgetName = item.getAttribute("data-vars-widget-name");
                        let currentUrl = window.location.href;
                        let placementNumber = item.getAttribute("data-vars-placement-number");
                        let backFill = item.getAttribute("data-vars-backfill")
                        let widgetItem = widget.children('.track');
                        let widgetNext = $(item).find('.htImpressionTracking').children('.track');
                        if (widgetNext.length > 0) {
                            for (const w of widgetNext) {
                                widgetItem.push(w);
                            }
                        }
                        let promotions = [];

                        if (backFill == null)
                            backFill = 'No';

                        for (const item of widgetItem) {
                            let promoItems = {};
                            let id = item.getAttribute("data-vars-storyid");
                            let orderId = item.getAttribute("data-vars-orderid");
                            let storyUrl = item.getAttribute("data-vars-story-url");
                            promoItems["id"] = id;
                            promoItems["name"] = widgetName;
                            promoItems["creative"] = storyUrl;
                            promoItems["position"] = orderId;
                            promotions.push(promoItems);
                            $(item).on("click", function () {
                                fireGAClickTrackingCricket(widgetName, pageType, placementNumber, currentUrl, id, storyUrl, orderId, backFill);
                            });
                        }


                        dataLayer.push({
                            'event': 'promoView',
                            'widgetName': widgetName,
                            'pageType': pageType,
                            'placementNumber': placementNumber,
                            'pageUrl': currentUrl,
                            'backFill': backFill,
                            'ecommerce': {
                                'promoView': {
                                    'promotions': promotions
                                }
                            }
                        });
                        item.classList.add("eventFired");

                    }
                } else {
                    item.classList.remove("eventFired");
                }
            });
        }
        fireGAImpressionTrackingCricket();
    }

    $("#location-filter").parents(".custom-select-wrapper").find(".custom-options span").on("click", function () {
        custom.getCityStoriesFromAPIForYou($(this).attr("id"));
        bindHomeWeatherFY($(this).attr("id"));
        bindHomeAQIFY($(this).attr("id"));
    });



    function bindHomeWeatherFY(cityName) {
        var city = cityName;
        if (city == "delhi-news") {
            city = 'new-delhi';
        } else if (city == "gurugram-news") {
            city = 'gurgaon';
        }
        //let text = "Visit Microsoft!";
        city = city.replace("-news", "");
        var ajaxurl = "https://www.hindustantimes.com/static-content/5m/weather/" + city + ".json";
        $.ajax({
            url: ajaxurl,
            dataType: 'json',
            success: function (data) {
                bindCityWeatherFY(data);
                getCityWeatherFY(city);
            }
        });
    }

    function bindCityWeatherFY(data) {
        $('.fytemp').html(Math.round(data.main.temp));
    }

    function bindHomeAQIFY(cityName) {
        var city = cityName;
        city = city.replace("-news", "");
        var ajaxurl = "https://www.hindustantimes.com/static-content/5m/air-quality-v2/" + city + ".json";
        $.ajax({
            url: ajaxurl,
            dataType: 'json',
            success: function (res) {
                bindCityAQIFY(res.data);
            },
            error: function () {
                bindCityAQIFY();
            }
        });
    }

    function bindCityAQIFY(data = undefined) {
        $(".airSec").removeClass("good poor very-poor moderate severe satisfactory unavailable");
        if (data == undefined) {
            $(".airSec").addClass("unavailable");
            $(".airSec").html("AQI <span>Currently Unavailable</span>");
        } else {
            let AQIValue = data.airQuality.pollutantAverage;
            if (AQIValue == 'NA' || AQIValue == "") {
                $(".airSec").addClass("unavailable");
                $(".airSec").html("AQI <span>Currently Unavailable</span>");
            } else {
                $('#airquality').html(Math.round(AQIValue));
                let AQIRange = custom.aqiScale.filter(aqi => AQIValue >= aqi.min && AQIValue <= aqi.max);
                let status = AQIRange[0].status || "";
                let className = AQIRange[0].class || "";
                $(".airSec").addClass(className);
                let html = `<div class="airQual ${className}">AQI <strong>${Math.round(AQIValue)}</strong></div>
                        <div class="qual ${className}">${status}</div>
                        <div class="airQualBaar" style="--count:${AQIValue}">
                            <span class="good"></span>
                            <span class="satisfactory"></span>
                            <span class="moderate"></span>
                            <span class="poor"></span>
                            <span class="very-poor"></span>
                            <span class="severe"></span>
                        </div>`;
                $(".airSec").html(html);
            }
        }
    }

    $("#drpCricket").parent().find(".custom-select").each(function (i, el) {
        $(el).on('click', function (e) {
            var tourId = e.target.id.toLowerCase();
            swiper.filterCricketSlide('tour_' + tourId);
        });
    });


    var global_json_data = '';
    function getCityWeatherFY(city) {
        city = city.replace("-", " ");
        if (global_json_data) {
            bindCityWeatherImageFY(global_json_data, city);
        } else {
            $.ajax({
                url: 'https://www.hindustantimes.com/static-content/5m/htweather.json',
                dataType: 'json',
                success: function (data) {
                    global_json_data = data;
                    bindCityWeatherImageFY(data, city);
                }
            });
        }
    }

    function bindCityWeatherImageFY(data, city) {
        var cityData = data.weather.filter(function (item) { return item.name.toLowerCase() == city; })[0];
        if ($(".airQualweath").length) {
            let date = new Date();
            let currentTime = date.getTime();
            let sunrise = Date.parse(custom.getDate(date) + " " + cityData.sun_rise);
            let sunset = Date.parse(custom.getDate(date) + " " + cityData.sun_set);
            if (currentTime < sunrise || currentTime >= sunset) {
                $("#top_icon_url").attr("src", cityData.ht_icon_url_night || cityData.icon_url);
            } else {
                $("#top_icon_url").attr("src", cityData.ht_icon_url || cityData.icon_url);
            }
            $(".weatherTitle").text(cityData.temprature_long_details);
        } else {
            $("#top_icon_url").attr("src", cityData.icon_url);
        }
    }

    try {
        if ($(".elFilters").length > 0) {
            var resultValue = 'all';
            var partyValue = 'all';

            $("#drpParty").parent().find(".custom-select").each(function (i, el) {
                $(el).on('click', function (e) {
                    partyValue = e.target.id.toLowerCase();
                    getKeyCandidates(month);
                });
            });

            $("#drpResult").parent().find(".custom-select").each(function (i, el) {
                $(el).on('click', function (e) {
                    resultValue = e.target.id.toLowerCase();
                    getKeyCandidates(month);
                });
            });

            $("#location-filter").parent("customDropDown").children().find(".custom-select").each(function (i, el) {
                $(el).on('click', function (e) {
                    alert('clicked');
                });
            });


            function getKeyCandidates(month) {
                $.ajax({
                    url: "https://www.hindustantimes.com/feed-elections/10s/2022-" + month + "/keycandidates-2022.json",
                    dataType: "json",
                    success: function (res) {
                        var finalLi = '';
                        var list = '';
                        res[keyCandidate_state]['key-candidate'].forEach(function (elm) {
                            var to_show = true;
                            if (resultValue != 'all')
                                if (resultValue != elm.win_status_eng.toLowerCase())
                                    to_show = false;

                            if (to_show && partyValue != 'all')
                                if (partyValue != elm['party-initials'].toLowerCase())
                                    to_show = false;


                            var candidateLink = pageUrl + "/" + elm.candidate_name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "");
                            if (to_show) {
                                var lix = '<li>';
                                lix += '<div class="nameDetail">';
                                lix += '<div class="cImg"><img src="' + elm.candidate_img + '" alt="' + elm.candidate_name + '?1"></div>';
                                lix += '<div class="cInfo">';
                                if (elm['education'] != 'NA' && (location.href.toString().indexOf("web-view") < 0))
                                    lix += '<span class="name"><a href="' + candidateLink + '">' + elm.candidate_name + '</a></span>';
                                else
                                    lix += '<span class="name">' + elm.candidate_name + '</span>';

                                lix += '<span class="partyName"><small>' + elm['party-initials'] + '</small><small>' + elm.ac + '</small></span>';
                                lix += '</div>';
                                lix += '</div>';
                                if (elm.win_status_eng != '')
                                    lix += '<div class="candiStatus"><img src="https://www.hindustantimes.com/static-content/1y/2021/' + elm.win_status_eng.toLowerCase() + '-icon.svg" alt=""></div>';
                                lix += '</li>';
                                finalLi += lix;
                            }
                        });
                        $('#ulKeyCandidates').html(finalLi);
                    }
                });
            }

            let month = "03";
            if ($(".keycandidatesNew")) {
                getKeyCandidates("12");
                month = "12";
            }
            else
                getKeyCandidates("03");


            setInterval(() => {
                setInterval(getKeyCandidates(month));
            }, 30000);

        }
    } catch { }
});