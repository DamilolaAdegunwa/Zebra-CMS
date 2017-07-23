﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Zebra.DataRepository.Models;
using Zebra.Services.Interfaces;
using Zebra.Services.Operations;

namespace Zebra.APIControllers
{
    public class NodeServiceController : ApiController
    {
        public INodeOperations _ops;
        
        public NodeServiceController(INodeOperations nodeops) : base()
        {
            _ops = nodeops;
        }

        [HttpGet]
        public string GetChildNodes(string parentid)
        {
            Node node = new Node() { Id = new Guid(parentid) };
            var list = _ops.GetChildNodes(node);
            var newlist = list.Select(x => new { x.Id, x.NodeName });
            return JsonConvert.SerializeObject(newlist);
        }


        [HttpPost]
        public string CreateNode()
        {
            var json = HttpContext.Current.Request.Form[0];
            dynamic tmp = JsonConvert.DeserializeObject(json);

            string parentid = tmp.parentid;
            var node = ((IStructureOperations)_ops).CreateNode("temp node", parentid, "6362B5BA-7238-43A0-B3DB-FA24A9A2F925");
            return JsonConvert.SerializeObject(node);
        }
        

       

        
       
    }
}
