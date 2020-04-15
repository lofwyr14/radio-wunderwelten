var bremen4 = jQuery("html");
var $table = bremen4.contents().find("table.top44_table>tbody");

var result = "";
result += "    episode = {\n";
result += "      id      = \""+"XXX"+"\"\n";
result += "      title   = \"Zeiglers wunderbare Welt des Pop\"\n";
result += "      date    = 2016-" + bremen4.find(".contact_second_headline:first").text().replace(/Playlist vom/, "") + "\n";
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

result
