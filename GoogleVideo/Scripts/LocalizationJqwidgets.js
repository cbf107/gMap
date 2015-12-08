var getLocalization = function () {
    var localizationobj = {};
    localizationobj.pagerGoToPageString = "前往:";
    localizationobj.pagerShowRowsString = "显示行:";
    localizationobj.pagerRangeString = " 总数:";
    localizationobj.pagerNextButtonString = "下一页";
    localizationobj.pagerFirstButtonString = "第一页";
    localizationobj.pagerLastButtonString = "最后一页";
    localizationobj.pagerPreviousButtonString = "前一页";
    localizationobj.sortAscendingString = "升序";
    localizationobj.sortDescendingString = "降序";
    localizationobj.sortRemoveString = "取消";
    localizationobj.firstDay = 1;
    localizationobj.percentSymbol = "%";
    localizationobj.currencySymbol = "￥";
    localizationobj.currencySymbolPosition = "before";
    localizationobj.decimalSeparator = ".";
    localizationobj.thousandsSeparator = ",";
    localizationobj.emptydatastring = "没有数据记录！";
    localizationobj.loadtext = "处理中...";
    localizationobj.filtersearchstring = "&nbsp;查找：";
    var days = {
        // full day names
        names: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        // abbreviated day names
        namesAbbr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        // shortest day names
        namesShort: ["日", "一", "二", "三", "四", "五", "六"]
    };
    localizationobj.days = days;
    var months = {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
        // abbreviated month names
        namesAbbr: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", ""]
    };
    var patterns = {
        // short date pattern
        d: "M/d/yyyy",
        // long date pattern
        D: "dddd, MMMM dd, yyyy",
        // short time pattern
        t: "h:mm tt",
        // long time pattern
        T: "h:mm:ss tt",
        // long date, short time pattern
        f: "dddd, MMMM dd, yyyy h:mm tt",
        // long date, long time pattern
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        // month/day pattern
        M: "MMMM dd",
        // month/year pattern
        Y: "yyyy MMMM",
        // S is a sortable format that does not vary by culture
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
        // formatting of dates in MySQL DataBases
        ISO: "yyyy-MM-dd hh:mm:ss",
        ISO2: "yyyy-MM-dd HH:mm:ss",
        d1: "dd.MM.yyyy",
        d2: "dd-MM-yyyy",
        d3: "dd-MMMM-yyyy",
        d4: "dd-MM-yy",
        d5: "H:mm",
        d6: "HH:mm",
        d7: "HH:mm tt",
        d8: "dd/MMMM/yyyy",
        d9: "MMMM-dd",
        d10: "MM-dd",
        d11: "MM-dd-yyyy"

    }
    localizationobj.patterns = patterns;
    localizationobj.months = months;
    return localizationobj;
}
