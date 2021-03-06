﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MapMark.aspx.cs" Inherits="gMapMark.gMapMark.MapMark" ValidateRequest="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
    <%--<meta name="viewport" content="width=device-width,initial-scale=1"/> --%>
    <link media="screen" rel="stylesheet" href="../lib/bootstrap/css/bootstrap.min.css">
    <script language="javascript" src="../lib/bootstrap/js/jquery-1.11.3.min.js"></script>
    <script language="javascript" src="../lib/bootstrap/js/bootstrap.min.js"></script>
  
    <script language="javascript" type="text/javascript">
        var Map;
        var zoomLevel = 3;
        var mLatLng;
        var markers = [];

        //显示录入视频面板
        function showIPanel() {
            $('#myModal').modal("show");
        }


        //刷新地图加载点（zLevel是缩放等级数）
        function RefreshMap(zLevel) {
            //清除地图上的现有点
            setMapOnAll(null);
            markers = [];

            zoomLevel = zLevel;

            //后台读取需要加载点（后台当前访问数据库，后期要处理为缓存模式）
            $.get("MarkList.aspx?zoomLevel=" + zoomLevel,
                function (data, status) {
                    var objlist = jQuery.parseJSON(data);

                    for (var i = 0; i < objlist.length; i++) {

                        //alert(objlist[i].MarkName);
                        //alert(objlist[i].Latitude);
                        //alert(objlist[i].Longitude);

                        mLatLng = { lat: objlist[i].Latitude, lng: objlist[i].Longitude };

                        var marker = new google.maps.Marker({
                            refId: objlist[i].RefId,
                            position: mLatLng,
                            map: Map,
                            title: objlist[i].MarkName
                        });

                        //单击mark点后加载视频（这里用updatepanel触发页面隐藏按钮BtnLoadVedio，服务端刷新展示面板中的视频连接)
                        marker.addListener('click',
                             function () {
                                 //alert(this.refId);
                                 $("#txtRefId").val(this.refId);
                                 document.getElementById("BtnLoadVedio").click();
                             }
                        );

                        //zoomLevel变化后用于清除
                        markers.push(marker);
                    }//for
                }
            );
         }

         function setMapOnAll(map) {
             for (var i = 0; i < markers.length; i++) {
                 markers[i].setMap(map);
             }
         }

         // Removes the markers from the map, but keeps them in the array.
         function clearMarkers() {
             setMapOnAll(null);
         }
     
    </script>

    <style type="text/css">
      html, body { height: 100%; margin: 0; padding: 0; }
      #map { height: 100%; }
    </style>

  <head>
  </head>
  <body>

        <div id="contextMenu" style="width:130px;left:0;top:0; position:absolute; z-index:1000; background-color:#fff;">
            <table class="table table-bordered">
                <tr><td><span class="icon-film"></span><a style="cursor:pointer;padding-left:10px;" onclick="showIPanel();">插入视频标记</a></td></tr>
                <tr><td><span class="icon-facetime-video"></span><a style="cursor:pointer;padding-left:10px;" onclick="showIPanel();">插入直播标记</a></td></tr>
            </table>
        </div>
        <div id="Info" style="z-index:1000;"></div>
        <div id="map"></div>

    <script type="text/javascript" language="javascript">
        var contextMenu = $("#contextMenu");

        //初始加载地图
        function initMap() {
            //右键菜单隐藏
            contextMenu.hide();

            //这里将来替换成后台读取（可配置在字典中）
            //中心点
            var tw = new google.maps.LatLng(35.60371874069731, 104.0625)
            var myLatLng = { lat: 35.60371874069731, lng: 104.0625 };

            Map = new google.maps.Map(document.getElementById('map'), {
                zoom: zoomLevel,
                center: myLatLng
            });

            //加载点
            RefreshMap(zoomLevel);


            //地图显示等级变换后触发事件
            google.maps.event.addListener(Map, 'zoom_changed', function () {
                //隐藏右键菜单
                contextMenu.hide();

                zoomLevel = Map.getZoom();

                //设置中心点（这里待完善）
                Map.setCenter(tw);

                //alert('缩放级别: ' + zoomLevel);                

                RefreshMap(zoomLevel);
            });

            //地图单击事件
            google.maps.event.addListener(Map, 'click', function () {
                contextMenu.hide();
            });

            //地图右键菜单事件
            google.maps.event.addListener(Map, 'rightclick', function (event) {
                var mapDiv = $(Map.getDiv()),
                x = event.pixel.x,
                y = event.pixel.y;

                // save the clicked location
                clickedLatLng = event.latLng;

                $("#contextMenu").css({ left: x, top: y });

                $("#txtLongitude").val(event.latLng.lng());
                $("#txtLatitude").val(event.latLng.lat());
                $("#txtZoomLevel").val(zoomLevel);
                $("#coordinateInfo").html("<b>经度：</b>" + event.latLng.lng() + "<br/>" + "<b>纬度：</b>" + event.latLng.lat() + "<br/>")
                contextMenu.show();

                //
                /*
                if (confirm("插入视频?")) {
                alert(event.latLng);
                alert(event.latLng.lat());
                alert(event.latLng.lng());
                }
                */
            });

          
        }
    </script>

    <script async defer
      src="http://ditu.google.cn/maps/api/js?v=3&key=AIzaSyA4qSVZhJS4F-hPDu2J6Fm0kz-mqCQzmRs &callback=initMap">
    </script>


    <form id="form1" runat="server">
        <!--添加视频面板start-->  
        <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel">插入视频</h3>
          </div>
          <div class="modal-body">    
            <table>
                <tr>
                    <td rowspan="3" style="width:50%;vertical-align:top; padding-top:10px;">
                        <div><span class="icon-map-marker"></span><span style="padding-left:20px;">坐标信息</span></div>
                        <div id="coordinateInfo" style="padding-top:10px; text-align:left;"></div>
                    </td>
                    <td style="width:50%"><asp:TextBox ID="txtMarkName" runat="server" placeholder="视频名称"></asp:TextBox></td>
                </tr>            
                <tr><td><asp:TextBox ID="txtMarkCommentA" runat="server" placeholder="视频简介" TextMode="MultiLine"></asp:TextBox></td></tr>
                <tr><td><asp:TextBox ID="txtMarkCommentB" runat="server" placeholder="视频代码（来自视频网站[如:优酷])" TextMode="MultiLine"></asp:TextBox></td></tr>            
                <tr><td colspan="2"><asp:TextBox ID="txtTags" runat="server" placeholder="标签" Width=430></asp:TextBox></td></tr>            
            </table>  
            <div style="display:none;">
                <asp:TextBox ID="txtLongitude" runat="server"></asp:TextBox>
                <asp:TextBox ID="txtLatitude" runat="server"></asp:TextBox>
                <asp:TextBox ID="txtZoomLevel" runat="server"></asp:TextBox>
            </div>
          </div>
          <div class="modal-footer">
            <asp:Button ID="BtnSave" runat="server" Text="保存确定" CssClass="btn" 
                  onclick="BtnSave_Click" />
            <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
          </div>
        </div>
        <!--添加视频面板end-->  

    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
        <!--视频展示面板start-->       
        <div id="showWindow" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div id="InfoTitle" runat="server" style="padding-left:15px;padding-top:5px;"></div>
            <div id="InfoPanel" runat="server" style="padding:15px;">
            </div>
            <div class="modal-footer">        
            <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
            </div>
        </div>
        <div style="display:none;">
            <asp:TextBox ID="txtRefId" runat="server"></asp:TextBox>
            <asp:Button Id="BtnLoadVedio" runat="server" Text="BtnLoadVedio" 
                onclick="BtnLoadVedio_Click"  />
        </div>
        <!--视频展示面板end-->  
        </ContentTemplate>
    </asp:UpdatePanel>
    </form>


  </body>
</html>
