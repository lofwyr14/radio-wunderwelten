/*
 Auslesen der Daten von

 http://www.radiobremen.de/bremenvier/musik/playlists/zeiglerswunderbareweltdespop100.html?id=108
 */

var initZwwdp = function () {

  jQuery("#page\\:update").click(function () {

    var number = parseInt(jQuery(Tobago.Utils.escapeClientId("page:number::field")).val());
    var bremen4 = jQuery(Tobago.Utils.escapeClientId("page:bremen4"));

    bremen4.attr("src", "/popecke/zwwdp-" + number + ".htm");
  });

  jQuery("#page\\:extract").click(function () {

    var number = parseInt(jQuery(Tobago.Utils.escapeClientId("page:number::field")).val());
    var $textarea = jQuery(Tobago.Utils.escapeClientId("page:result::field"));
    var bremen4 = jQuery(Tobago.Utils.escapeClientId("page:bremen4"));
    var $table = bremen4.contents().find("table.top44_table>tbody");
    var text = bremen4.contents().find(".contact_second_headline:first").text();
    text = text.replace(/Playlist vom/, "");
    text = text.replace(/Zeiglers wunderbare Welt des Pop vom/, "");
    text = text.replace(/ZwWdP vom/, "");
    text = text.replace(/AZwWdP vom/, "");
    text = text.trim();
    var dateParts = text.split(".");
    var date;
    if (dateParts.length == 3) {
      date = "" + dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
    } else {
      if (number <= 106) {
        date = "2015-" + text;
      } else {
        date = "2016-" + text;
      }
    }

    var result = "";
    result += "    episode = {\n";
    result += "      id      = \"" + number + "\"\n";
    result += "      title   = \"Zeiglers wunderbare Welt des Pop\"\n";

    result += "      date    = " + date + "\n";
    result += "      songlist = {\n";
    var hour = 0;
    $table.children().each(function (i) {
      if (i == 0) {
        return;
      }
      var row = jQuery(this);
      row.children().each(function (index) {
        var cell = jQuery(this);
        var text = cell.text().replace(/\n/, "").trim();
        if (index == 0) {
          if (text != "") {
            hour++;
            if (hour > 1) {
              result += "        }\n";
            }
            result += "        songlist = {\n";
          }
          result += "          song = {\n";
        }
        if (index == 1) {
          result += "          performer = \"" + text + "\"\n";
        }
        if (index == 2) {
          result += "          title = \"" + text + "\"\n";
          result += "          }\n";
        }
      });
    });
    result += "        }\n";
    result += "      }\n";
    result += "    }\n";

    $textarea.val($textarea.val() + "\n\n" + result);

    jQuery(Tobago.Utils.escapeClientId("page:number::field")).val(number + 1);
    jQuery("#page\\:update").click();

    if (number < 120) {
      setTimeout('jQuery("#page\\\\:extract").click();', 3000);
    }

  });
};

Tobago.registerListener(initZwwdp, Tobago.Phase.DOCUMENT_READY);
Tobago.registerListener(initZwwdp, Tobago.Phase.AFTER_UPDATE);

