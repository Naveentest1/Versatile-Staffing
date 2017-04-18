/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function ($) {
    Drupal.behaviors.tavant_custom = {
        attach: function (context, settings) {
            $(document).ready(function () {
                var url = settings.tavant_custom.url;
                var link = settings.tavant_custom.link;

                if (settings.tavant_custom.load_cbox == true) {
                    // Display a welcome message on first visit, and set a cookie that expires configured time:
                    if (document.cookie.indexOf('tvnt_popup_visited=true') === -1) {
                        loadHomeTeaser(url, settings.tavant_custom.cookie_lifetime, settings.tavant_custom.popup_timeout);
                    }
                    if (link != '') {
                        if (document.getElementById('cboxLoadedContent') != 'undefined') {
                            $('.cboxPhoto').ready(function () {
                                $('.cboxPhoto').wrap('<a href="' + link + '" style="text-decoration:none;" target="_blank"></a>');
                            });
                        }
                    }
                }
            });

            function loadHomeTeaser(url, cookie_lifetime, popup_timeout) {
                var expires = new Date();
                //expires.setDate(expires.getDate());
                expires.setTime(expires.getTime() + cookie_lifetime);
                document.cookie = "tvnt_popup_visited=true; expires=" + expires.toUTCString();
                if (popup_timeout > 0) {
                    popup_timeout = popup_timeout * 1000;
                } else
                    popup_timeout = 10 * 1000;

                $.colorbox({
                    href: url, open: true,
                    onComplete: function () {
                        setTimeout(function () {
                            $.colorbox.close();
                        }, popup_timeout);
                    }
                });


            }
        }
    };

    $('.view-data-blocks').ready(function () {
        $(".group1").colorbox({ rel: 'group1', transition: "fade", inline: true, width: "887px" });
        $(".group2").colorbox({ rel: 'group2', transition: "fade", inline: true, width: "887px" });
    });
})(jQuery);


