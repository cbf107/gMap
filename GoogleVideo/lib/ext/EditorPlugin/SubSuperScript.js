Ext.ux.HtmlEditorSubSuperScript = Ext.extend(Ext.ux.HtmlEditorMidasCommand, {
    // private
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'subscript',     
        overflowText: 'Subscript'
    }, {
        enableOnSelection: true,
        cmd: 'superscript',
        overflowText: 'Superscript'
    }]
});