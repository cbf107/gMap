<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="GoogleVideo.Index" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link media="screen" rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css" />
    <script type="text/javascript" src="/lib/bootstrap/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
    
    
    <script type="text/javascript" src="http://api.map.baidu.com/api? v=2.0& ak=PPNRpjICwsRNqOjU4aqrjr5q">
    </script>

    <style type="text/css">
      html, body { height: 100%; margin: 0; padding: 0; }     
    </style>

    <script language="javascript" type="text/javascript">
        var Map;
        var zoomLevel = 5;
        var mLatLng;
        var markers = [];

        //显示录入视频面板
        function showIPanel(p) {

            $("#txtLongitude").val(p.lng);
            $("#txtLatitude").val(p.lat);
            $("#txtZoomLevel").val(zoomLevel);
            $("#coordinateInfo").html("<b>经度：</b>" + p.lng + "<br/>" + "<b>纬度：</b>" + p.lat + "<br/>")

            $('#myModal').modal("show");
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
                        var marker = new BMap.Marker(mLatLng, {title: objlist[i].MarkName });
                        marker.refId=objlist[i].RefId,
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
      

            //这里将来替换成后台读取（可配置在字典中）
            //中心点
            Map = new BMap.Map("map");          // 创建地图实例  
            var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  

            Map.centerAndZoom(point, 5);       // 初始化地图，设置中心点坐标和地图级别  
            

            var contextMenu = new BMap.ContextMenu();
            contextMenu.addItem(new BMap.MenuItem("<span class='icon-film'></span>&nbsp;&nbsp;插入视频", showIPanel, 150));
            contextMenu.addItem(new BMap.MenuItem("<span class='icon-facetime-video'></span>&nbsp;&nbsp;插入直播", showIPanel, 150));
            Map.addContextMenu(contextMenu);
      
            //加载点
            RefreshMap(zoomLevel);


            //地图显示等级变换后触发事件
            Map.addEventListener('zoomend', function () {
                zoomLevel = Map.getZoom();
               
                RefreshMap(zoomLevel);
            });

        }
    </script>
</head>
<body>
     <div class="row">
        <table style="height: 100%; width: 100%">
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
                                <input type="text" style="width: 350px;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

    <div class="row-fluid">
        <div id="map" class="span10" style="bottom:30px;top:80px;margin-left:10px;position:absolute;">
        </div>
        <div id="extPanel" class="span2" style="right:10px;top:80px;bottom:30px;position: absolute;" runat="server">
        
        </div>
    </div>

    <div class="span12" style="bottom:10px;position:absolute;text-align:center;">
        About
    </div>

    <form id="form1" runat="server">
    <!--添加视频面板start-->
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                ×</button>
            <h3 id="myModalLabel">
                插入视频</h3>
        </div>
        <div class="modal-body">
            <table>
                <tr>
                    <td rowspan="3" style="width: 50%; vertical-align: top; padding-top: 10px;">
                        <div>
                            <span class="icon-map-marker"></span><span style="padding-left: 20px;">坐标信息</span></div>
                        <div id="coordinateInfo" style="padding-top: 10px; text-align: left;">
                        </div>
                    </td>
                    <td style="width: 50%">
                        <asp:TextBox ID="txtMarkName" runat="server" placeholder="视频名称"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtMarkCommentA" runat="server" placeholder="视频简介" TextMode="MultiLine"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtMarkCommentB" runat="server" placeholder="视频代码（来自视频网站[如:优酷])"
                            TextMode="MultiLine"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <asp:TextBox ID="txtTags" runat="server" placeholder="标签" Width="430"></asp:TextBox>
                    </td>
                </tr>
            </table>
            <div style="display: none;">
                <asp:TextBox ID="txtLongitude" runat="server"></asp:TextBox>
                <asp:TextBox ID="txtLatitude" runat="server"></asp:TextBox>
                <asp:TextBox ID="txtZoomLevel" runat="server"></asp:TextBox>
            </div>
        </div>
        <div class="modal-footer">
            <asp:Button ID="BtnSave" runat="server" Text="保存确定" CssClass="btn" OnClick="BtnSave_Click" />
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
            <div id="showWindow" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div id="InfoTitle" runat="server" style="padding-left: 15px; padding-top: 5px;">
                </div>
                <div id="InfoPanel" runat="server" style="padding: 15px;">
                </div>
                <div class="modal-footer">
                    <asp:Button ID="BtnDeleteVedio" runat="server" Text="删除" OnClick="BtnDeleteVedio_Click" OnClientClick="return confirm('确定删除坐标视频?');" CssClass="btn" />
                    <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
                </div>
            </div>
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

<script>
    initMap();
</script>

