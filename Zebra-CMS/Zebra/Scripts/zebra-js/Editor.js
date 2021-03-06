﻿//$(function () {
//    $('a.dialog').click(function () {
//        var url = $(this).attr('href');
//        var dialog = $('<div class="model-dialog" style="display:none"></div>').appendTo('body');
//        dialog.load(url, {},
//            function (responseText, textStatus, XMLHttpRequest) {
//                dialog.dialog({
//                    close: function (event, ui) {
//                        dialog.remove();
//                    }
//                });
//            });
//        return false;
//    });
//});

var ZebraEditor_currentnode = {element:null, type:null};

$(document).on('click', ".content-node", function () {
    if (event.target.parentElement === this) {
        var parentid = $(event.target.parentElement).attr('data-nodeid');
        var currentnode = $(event.target.parentElement);
        ZebraEditor_currentnode.element = currentnode;
        if (currentnode.attr('node-expanded') === 'false') {
            GetChildNodesAndAppend(parentid, currentnode);
            currentnode.attr('node-expanded', 'true');
        }
        else if (currentnode.attr('node-expanded') === 'true') {
            currentnode.find('div').remove();
            currentnode.attr('node-expanded', 'false');
        }
        LoadNodeBrowser(parentid, 'test', 'test', 'test');
    }
});

function CloseModelTreePopup()
{
    $('div.black-overlay').remove();
}

function GetSelectedNodeInPopup()
{
    return document.querySelector('.model-tree-popup .content-node[node-selected="true"]');
}

function ShowModelTreePopup(nodeid, parentid, parentnode, nodename, func)
{
    $('body').append("<div class='black-overlay' > <div class='model-tree-popup'><div class='model-popup-buttons'><button class='button-ok'>Ok</button> <button onclick='javascript:CloseModelTreePopup()' class='button-cancel'>Cancel</button> </div> </div>");
    var query = (nodeid == null || nodeid === '') ? '' : '?nodeid=' + nodeid;
    $.get("./NodeTree" + query, function (data) {
        $(".model-tree-popup").append(data);
        $('.model-tree-popup').children('div.content-tree').css('position', 'absolute').css('width', '100%').css('height', '100%').css('overflow', 'auto').css('text-align', 'justify').css('padding','0');
    });
    $('.button-ok').click(function (e) {
        func();
        CloseModelTreePopup();
    });
    var nodeinfo = [];
    nodeinfo.nodeid = nodeid;
    nodeinfo.parentid = parentid;
    nodeinfo.parentnode = parentnode;
    nodeinfo.nodename = nodename;
    console.log(nodeinfo);
}

function LoadNodeBrowser(nodeid, parentid, parentnode, nodename) {
    var query = nodeid == null || nodeid === '' ? '' : 'nodeid=' + nodeid;
    $.get("./NodeBrowser?" + query, function (data) {
        $(".item-container").html(data);
    });
}


$(document).on('click', ".context-menu-option", function () {
    
    var option = $(event.target).attr("context-menu-option");
    switch (option) {
        case "Add Node":
            var nodename = prompt("Enter Node name", "Enter Node name");
            if (nodename !== null && nodename !== '') {

                var parentid = $(event.target.parentElement).attr("data-context-nodeid");
                var parentnode = $("[data-nodeid='" + parentid + "']");
                ShowModelTreePopup(null, parentid, parentnode, nodename, function () { CreateNewNode(parentid, parentnode, nodename) });
          //      CreateNewNode(parentid, parentnode, nodename);
            }
            break;
        case "Delete Node":
            var nodeid = $(event.target.parentElement).attr("data-context-nodeid");
            var node = $("[data-nodeid='" + nodeid + "']");
            DeleteNode(nodeid, node);
            break;
        case "Move":
            var nodeid = $(event.target.parentElement).attr("data-context-nodeid");
            var node = $("[data-nodeid='" + nodeid + "']");
            ShowModelTreePopup('00000000-0000-0000-0000-000000000000', parentid, parentnode, nodename, function () { MoveNode(nodeid) });
            break;
    }
    $(".context-menu").remove();
});

function MoveNode(nodeid)
{
    newparentid = $(GetSelectedNodeInPopup()).attr('data-nodeid');
    if (nodeid == null) {
        return;
    }
    var nodeinfo = { newparentid: newparentid, nodeid: nodeid };
    $.ajax({
        type: "POST",
        url: "/zebraapi/nodeservice/movenode",
        cache: false,
        dataType: "json",
        data: JSON.stringify(nodeinfo),
        async: false,
        success: function (json) {
                window.location.reload(true);
        }
    });
}

$(".content-node").contextmenu(function (event) {
    event.preventDefault();
    var nodeid = $(event.target.parentElement).attr('data-nodeid');
    if (nodeid != null) {
        setSelectedNode(event.target);
        $("<div class='context-menu'><ul data-context-nodeid='" + nodeid + "'><li class='context-menu-option' context-menu-option='Add Node'>Add Node</li><li class='context-menu-option' context-menu-option='Delete Node'>Delete Node</li><li class='context-menu-option' context-menu-option='Move'>Move</li></ul></div>").css({ top: event.pageY + "px", left: event.pageX + "px" }).appendTo("body");
    }
});

function GetChildNodesAndAppend(parentid, currentnode) {
    $.ajax({
        url: "/zebraapi/nodeservice/getchildnodes?parentid=" + parentid,
        cache: false,
        dataType: "json",
        async: false,
        success: function (json) {

            json = $.parseJSON(json);
            for (var i = 0; i < json.length; i++) {
                $(currentnode).append(CreateNodeString(json[i]));
            }

        }
    });
}

//templateid is fetched from GetSelectedNodeInPopup()
function CreateNewNode(parentid, currentnode, nodename) {
    templateid = $(GetSelectedNodeInPopup()).attr('data-nodeid');
    if (currentnode == null)
    {
        currentnode = document.querySelector('*[data-nodeid="'+parentid+'"]');
    }
    var nodeinfo = { parentid: parentid, nodename: nodename, templateid: templateid };
    $.ajax({
        type: "POST",
        url: "/zebraapi/nodeservice/createnode",
        cache: false,
        dataType: "json",
        data: JSON.stringify(nodeinfo),
        async: false,

        success: function (json) {

            json = $.parseJSON(json);
            //for (var i = 0; i < json.length; i++)
            {
                $(currentnode).append(CreateNodeString(json));
                $(currentnode).attr('node-expanded', 'true');
            }

        }
    });
   // CloseModelTreePopup();
}

function ToggleNode()
{
    if ($(currentnode).attr('node-expanded') === 'true')
    {
        $(currentnode).attr('node-expanded', 'false');
    }
    else
    {
        $(currentnode).attr('node-expanded', 'true');
    }
}

function SetNodeSelected(nodetext)
{
    $(nodetext).css('background-color', 'darkgray').css('display', 'inline');
}



function DeleteNode(nodeid, node) {
    var nodeinfo = { nodeid: nodeid };
    $.ajax({
        type: "POST",
        url: "/zebraapi/nodeservice/deletenode",
        cache: false,
        dataType: "json",
        data: JSON.stringify(nodeinfo),
        async: false,

        success: function (json) {
            if (json == true) {
                $(node).remove();
            }

        }
    });
}


function CreateNodeString(json) {
    var node = "<div style='position:relative; margin:15px;' node-expanded='false' class='content-node' data-nodeid='" + json.Id + "'> <span></span> <p>" + json.NodeName + "</p> </div>";
    return node;
}



$(document).bind("mousedown", function (event) {
    if ($(event.target).attr("class") !== "context-menu-option") {
        var ele = $(".context-menu").remove();
    }

});





