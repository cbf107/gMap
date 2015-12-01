using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Entities;

namespace gMapMark.gMapMark.Presistent.Entities
{
    public class MarkEntity:EntityBase
    {
        public string MarkName { get; set; }
        public string MarkCommentA { get; set; }
        public string MarkCommentB { get; set; }
        public string MarkType { get; set; }
        public string UserId { get; set; }
        //public DateTime CreateDate { get; set; }
        //For Access
        public string CreateDate { get; set; }
        public decimal VisitCount { get; set; }
        public decimal PraiseCount { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public int rightRank { get; set; }
        public int zoomLevel { get; set; }
        public string Tag { get; set; }		
    }
}