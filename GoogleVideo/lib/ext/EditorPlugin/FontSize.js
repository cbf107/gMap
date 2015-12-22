/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Font
 * @extends Ext.util.Observable
 * <p>A plugin that creates a menu on the HtmlEditor for selecting a font. Uses the HtmlEditors default font settings which can be overriden on that component to change the list of fonts or default font.</p>
 */
Ext.ux.HtmlEditorFontSize = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        var cmp = this.cmp;
        var sizes = function(){
            var fnts = [];
            for(var mm=1;mm<13;mm++){
                fnts.push([mm,mm]);
            }
            return fnts;
        }(); 
        var btn = this.cmp.getToolbar().addItem({
            xtype: 'combo',
            displayField: 'display',
            valueField: 'value',
            name: 'fontsize',
            forceSelection: true,
            mode: 'local',
            triggerAction: 'all',
            width: 80,
            emptyText: 'font size',
            tpl: '<tpl for="."><div class="x-combo-list-item" style="font-size:{value};">{display}</div></tpl>',
            store: {
                xtype: 'arraystore',
                autoDestroy: true,
                fields: ['value','display'],
                data: sizes
            },
            listeners: {
                'select': function(combo,rec){
                    this.relayCmd('fontsize', rec.get('value'));
                    this.deferFocus();
                    combo.reset();
                },
                scope: cmp
            }
        });
    }
});