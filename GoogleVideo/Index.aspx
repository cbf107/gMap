<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="GoogleVideo.Index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>视频搜索</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link media="screen" rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css" />
    <script type="text/javascript" src="lib/bootstrap/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="Scripts/jquery.timeago.js"></script>
    <script type="text/javascript" src="lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api? v=2.0& ak=PPNRpjICwsRNqOjU4aqrjr5q"></script>
    <script src="jqwidgets/jqx-all.js" type="text/javascript"></script>
    <script src="Scripts/LocalizationJqwidgets.js" type="text/javascript"></script>
    <link href="jqwidgets/styles/jqx.base.css" rel="stylesheet" type="text/css" />
    <link href="jqwidgets/styles/jqx-gmap.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .modal-lg
        {
            width: 900px;
        }
    </style>
    <script language="javascript" type="text/javascript">
        var Map;
        var zoomLevel = 5;
        var mLatLng;
        var markers = [];
        var editRight = false;

        var videoIcon = new BMap.Icon("Img/VideoMarker.png", new BMap.Size(22, 31));
        var cameraIcon = new BMap.Icon("Img/CameraMarker.png", new BMap.Size(22, 31));

        //显示录入视频面板
        function showIPanel(p) {

            $("#txtLongitude").val(p.lng);
            $("#txtLatitude").val(p.lat);
            $("#txtZoomLevel").val(zoomLevel);
            $("#coordinateInfo").html("<b>经度：</b>" + p.lng + "<br/>" + "<b>纬度：</b>" + p.lat + "<br/>")

            var gCoder = new BMap.Geocoder();
            gCoder.getLocation(p, function (rs) {
                var addComp = rs.addressComponents;
                if (addComp.province == addComp.city)
                    centreAddress = addComp.province + addComp.district + addComp.street;
                else
                    centreAddress = addComp.province + addComp.city + addComp.district + addComp.street;
                $("#txtMarkName").val(centreAddress);
            });
            $('#myModal').modal("show");
        }

        function addCameraView(p) {
            $("#myModalLabel").text("添加直播");
            $("#txtAddingType").val("直播");
            showIPanel(p);
        }

        function addVideoView(p) {
            $("#myModalLabel").text("添加视频");
            $("#txtAddingType").val("视频");
            showIPanel(p);
        }


        //刷新地图加载点（zLevel是缩放等级数）
        function RefreshMap(zLevel) {
            //清除地图上的现有点
            clearMarkers();
            markers = [];

            if (zLevel != -1) {
                zoomLevel = zLevel;
            }

            //后台读取需要加载点（后台当前访问数据库，后期要处理为缓存模式）
            $.get("gMapMarker/MarkList.aspx?zoomLevel=" + zoomLevel,
                function (data, status) {
                    var objlist = jQuery.parseJSON(data);

                    for (var i = 0; i < objlist.length; i++) {

                        mLatLng = new BMap.Point(objlist[i].Longitude, objlist[i].Latitude);

                        var marker;
                        if (objlist[i].MarkType != "视频")
                            marker = new BMap.Marker(mLatLng, { icon: cameraIcon });
                        else
                            marker = new BMap.Marker(mLatLng, { icon: videoIcon });

                        marker.refId = objlist[i].RefId,
                        //单击mark点后加载视频（这里用updatepanel触发页面隐藏按钮BtnLoadVedio，服务端刷新展示面板中的视频连接)

                        marker.addEventListener('click',
                            function (e) {
                                $("#txtRefId").val(e.target.refId);
                                document.getElementById("BtnLoadVedio").click();
                            }
                        );

                        Map.addOverlay(marker);
                        //zoomLevel变化后用于清除
                        markers.push(marker);
                    } //for
                }
            );
        }

        function clearMarkers() {
            for (var i = 0; i < markers.length; i++) {
                Map.removeOverlay(markers[i]);
            }
        }
     
    </script>
    <script type="text/javascript" language="javascript">

        //初始加载地图
        function initMap() {

            Map = new BMap.Map("map", { enableMapClick: false });          // 创建地图实例  
            Map.addControl(new BMap.NavigationControl());
            Map.addControl(new BMap.ScaleControl());
            Map.enableScrollWheelZoom();
            var point = new BMap.Point(104.897328, 38.986703);  // 创建点坐标  

            Map.centerAndZoom(point, 5);       // 初始化地图，设置中心点坐标和地图级别  


            var contextMenu = new BMap.ContextMenu();

            contextMenu.addItem(new BMap.MenuItem("<span class='icon-film'></span>&nbsp;&nbsp;添加视频", addVideoView, 150));
            contextMenu.addItem(new BMap.MenuItem("<span class='icon-facetime-video'></span>&nbsp;&nbsp;添加直播", addCameraView, 150));
          
            if (editRight == true) {
                Map.addContextMenu(contextMenu);
            }

            //加载点
            RefreshMap(zoomLevel);

            //            Map.addEventListener('zoomend', function () {
            //                zoomLevel = Map.getZoom();
            //                RefreshMap(zoomLevel);
            //            });

        }

        function SearchPosition() {
            if (event.keyCode == 13) {
                var text = $("#txtSearch").val();
                var local = new BMap.LocalSearch(
                    Map, {
                        renderOptions: { map: Map },
                        onMarkersSet: function (pois) {
                            Map.clearOverlays();
                            zoomLevel = Map.getZoom();
                            RefreshMap(zoomLevel);
                        }
                    });
                local.search(text);
            }
        }

    </script>
</head>
<body style="position: absolute; right: 0; left: 0; top: 0; bottom: 0;">
    <div style="top: 0; left: 0; right: 0; height: 80px; position: absolute;">
        <table style="height: 100%; width: 100%;">
            <tr>
                <td valign="middle" style="padding-left: 20px; width: 320px;">
                    <img src="Img/Logo.png" alt="Logo" />
                </td>
                <td valign="bottom" align="left">
                    <table style="height: 40px">
                        <tr>
                            <td>
                                <a href="#">
                                    <img src="Img/search.png" alt="Search" style="height: 32px; width: 32px" />
                                </a>
                            </td>
                            <td valign="middle" style="vertical-align: middle; padding-top: 5px; padding-left: 10px;">
                                <input type="text" id="txtSearch" style="width: 350px;" onkeydown="SearchPosition()" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div id="map" style="bottom: 0px; top: 80px; right: 250px; left: 0px; position: absolute;
        border-right: 1px solid silver; border-top: 1px solid silver;">
    </div>
    <div id="extPanel" style="right: 0px; top: 80px; bottom: 0px; position: absolute;
        width: 250px; border-top: 1px solid silver;" runat="server">
        <div id="divAccordionNewest" style="border: 0">
            <div style="height: 100%; text-align: center; font-size: 12px;">
                <table>
                    <tr>
                        <td style="width: 20px">
                            <img src="Img/clock.png" alt="clock" />
                        </td>
                        <td style="text-align: left; font-weight: bold">
                            最新上传
                        </td>
                    </tr>
                </table>
            </div>
            <div id="collapseNewest" style="width: 245px;">
                <div id="divNewest" style="margin: 5px; width: 100%">
                    
                </div>
            </div>
        </div>
        <div id="divAccordionRank" style="border: 0">
            <div style="height: 100%; text-align: center; font-size: 12px;">
                <table >
                    <tr>
                        <td style="width: 20px">
                            <img src="Img/center_top.png" alt="clock" />
                        </td>
                        <td style="text-align: left; font-weight: bold">
                            播放最多
                        </td>
                    </tr>
                </table>
            </div>
            <div id="collapseTop" style="width: 245px;">
                <div id="divRanking" style="margin: 5px; width: 100%">
                </div>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
    <!--添加视频面板start-->
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                ×</button>
            <h3 id="myModalLabel">
            </h3>
        </div>
        <div class="modal-body">
            <table>
                <tr>
                    <td rowspan="3" style="width: 30%; vertical-align: top; padding-top: 10px;">
                        <div>
                            <span class="icon-map-marker"></span><span style="padding-left: 20px;">坐标信息</span></div>
                        <div id="coordinateInfo" style="padding-top: 10px; text-align: left;">
                        </div>
                    </td>
                    <td style="padding: 5px">
                        <asp:TextBox ID="txtMarkName" Width="320px" runat="server" placeholder="名称"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="RFVMarkName" runat="server" ForeColor="Red" ValidationGroup="Adding"
                            ControlToValidate="txtMarkName" ErrorMessage="请输入名称！">
                        </asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 5px">
                        <asp:TextBox ID="txtMarkCommentA" Width="320px" runat="server" placeholder="简介" TextMode="MultiLine"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="RFVCommentA" runat="server" ForeColor="Red" ValidationGroup="Adding"
                            ControlToValidate="txtMarkCommentA" ErrorMessage="请输入简介！">
                        </asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 5px">
                        <asp:TextBox ID="txtMarkCommentB" Width="320px" runat="server" placeholder="链接代码（来自视频网站[如:优酷])"
                            TextMode="MultiLine"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="RFVCommentB" runat="server" ForeColor="Red" ValidationGroup="Adding"
                            ControlToValidate="txtMarkCommentB" ErrorMessage="请粘贴链接！">
                        </asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr style="display: none;">
                    <td colspan="2">
                        <asp:TextBox ID="txtTags" runat="server" placeholder="标签" Width="430"></asp:TextBox>
                    </td>
                </tr>
            </table>
            <div style="display: none;">
                <asp:TextBox ID="txtLongitude" runat="server"></asp:TextBox>
                <asp:TextBox ID="txtLatitude" runat="server"></asp:TextBox>
                <asp:TextBox ID="txtZoomLevel" runat="server"></asp:TextBox>
                <asp:TextBox ID="txtAddingType" runat="server"></asp:TextBox>
            </div>
        </div>
        <div class="modal-footer">
            <asp:Button ID="BtnSave" runat="server" Text="保存确定" CssClass="btn" ValidationGroup="Adding"
                OnClick="BtnSave_Click" />
            <button class="btn" data-dismiss="modal" aria-hidden="true">
                关闭</button>
        </div>
    </div>
    <!--添加视频面板end-->
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <!--视频展示面板start-->
            <div id="showWindow" class="modal fade">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div style="text-align:right;"><asp:Button ID="btnC" runat="server" Text="×" onclick="btnClose_Click" BackColor="White" BorderStyle=None  /></div>
                        <div id="InfoTitle" class="modal-header" runat="server">
                        </div>
                        <div id="InfoPanel" runat="server" style="text-align: center;">
                        </div>
                        <div class="modal-footer">
                            <asp:Button ID="btnDelete" runat="server" Text="删除" CssClass="btn" 
                                onclick="btnDelete_Click" OnClientClick="return confirm('删除后无法恢复！确定删除?');"/>
                            &nbsp;&nbsp;
                            <asp:Button ID="btnClose" runat="server" Text="关闭" onclick="btnClose_Click" CssClass="btn" />
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->
            <div style="display: none;">
                <asp:TextBox ID="txtRefId" runat="server"></asp:TextBox>
                <asp:Button ID="BtnLoadVedio" runat="server" Text="BtnLoadVedio" OnClick="BtnLoadVedio_Click" />
            </div>
            <!--视频展示面板end-->
        </ContentTemplate>
    </asp:UpdatePanel>
    </form>
</body>
</html>
<script type="text/javascript">
    initMap();

    $("#divAccordionNewest").jqxExpander({ width: '100%', expanded: false, theme: "GMap" });
    $("#divAccordionRank").jqxExpander({ width: '100%', expanded: false, theme: "GMap" });
</script>
<script type="text/javascript" src="Scripts/RankingAjax.js">
</script>
