Ext.ux.HtmlEditorIndentOutdent = Ext.extend(Ext.ux.HtmlEditorMidasCommand, {
    // private
    midasBtns: ['|', {
        cmd: 'indent',
        overflowText: 'Indent Text'
    }, {
        cmd: 'outdent',
        overflowText: 'Outdent Text'
    }]
});