function GetLatestReleaseInfo(product, url) {
    $.getJSON(url).done(function (release) {
        var asset = release.assets[0];
        var downloadCount = 0;
        for (var i = 0; i < release.assets.length; i++) {
            downloadCount += release.assets[i].download_count;
        }
        var oneHour = 60 * 60 * 1000;
        var oneDay = 24 * oneHour;
        var dateDiff = new Date() - new Date(asset.updated_at);
        var timeAgo;
        if (dateDiff < oneDay) {
            timeAgo = (dateDiff / oneHour).toFixed(1) + " hours ago";
        } else {
            timeAgo = (dateDiff / oneDay).toFixed(1) + " days ago";
        }
        var releaseInfo = release.tag_name + " (&ldquo;" + release.name+ "&rdquo;) was released " + timeAgo + " and downloaded " + downloadCount.toLocaleString() + " times.";
        $(product + "-download").attr("href", asset.browser_download_url);
        $(product + "-release-info").html(" " + releaseInfo);
        $(product + "-release-info").fadeIn("slow");
    });
}
