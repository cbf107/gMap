var rankingSource =
    {
        dataType: "json",
        dataFields: [
            { name: 'Identifier' },
            { name: 'MarkName', type: 'string' },
            { name: 'MarkType', type: 'string' },
            { name: 'CreateDate', type: 'date' },
            { name: 'VisitCount', type: 'int' },
            { name: 'Longitude', type: 'float' },
            { name: 'Latitude', type: 'float' }
        ],
        url: ""
    };

var sortField = "";

function renderRankingPosition(row, column, value, rowData) {
    var marker = rowData;
    var content = '<table width="100%" >';
    content += '<tr><td rowspan="2" style="width:30px" >';
    if (marker.MarkType == "直播")
        content += '<img src="Img/CameraMarker.png" alt="直播" />';
    else
        content += '<img src="Img/VideoMarker.png" alt="视频" />';
    content += "</td>";
    content += '<td align="left" style="font-weight:bold">' + marker.MarkName + "</td></tr>";
    content += "<tr><td>";
    if (sortField == "CreateDate")
        content += jQuery.timeago(marker.CreateDate);
    else
        content += "播放次数：" + marker.VisitCount;
    content += "</td></tr></table>";
    return content;
}

function RenderRankingTable(contentID) {
    rankingSource.url = "gMapMarker/RankList.aspx?Rank=" + sortField;
    var dataAdapter = new $.jqx.dataAdapter(rankingSource);
    if (document.getElementById(contentID).childElementCount == 0) {
        $("#" + contentID).jqxDataTable(
                {
                    localization: getLocalization(),
                    pageable: false,
                    source: dataAdapter,
                    columnsResize: true,
                    enableHover: false,
                    theme: "NoBoard",
                    showHeader: false,

                    columns: [
                        { text: '', dataField: 'MarkName', width: 235, cellsRenderer: renderRankingPosition, cellClassName: "NoBoard" }
                    ]
                });
        $("#" + contentID).on('rowSelect', onRowSelected);
    }
    else {
        $("#" + contentID).jqxDataTable('updateBoundData');
    }
}


$('#divAccordionNewest').on('expanding', function () {
    sortField = "CreateDate";
    var contentID = "divNewest";
    RenderRankingTable(contentID);
    $('#divAccordionRank').jqxExpander({ collapseAnimationDuration: 0 });
    $('#divAccordionRank').jqxExpander('collapse');
})

$('#divAccordionRank').on('expanding', function () {
    sortField = "VisitCount";
    var contentID = "divRanking";
    RenderRankingTable(contentID);
    $('#divAccordionNewest').jqxExpander({ collapseAnimationDuration: 0 });
    $('#divAccordionNewest').jqxExpander('collapse');
})

function onRowSelected(event) {
    var args = event.args;
    var row = args.row;
    var index = args.index;
    var boundIndex = args.boundIndex;
    var key = args.key;

    var point = new BMap.Point(row.Longitude, row.Latitude);
    var zoom = Map.getZoom();
    if (zoom < 10) Map.centerAndZoom(point, 10);
    else Map.centerAndZoom(point, zoom);
    $("#txtRefId").val(row.Identifier);
    document.getElementById("BtnLoadVedio").click();

    
}
