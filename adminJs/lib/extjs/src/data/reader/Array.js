/**
 * @author Ed Spencer
 * @class Ext.data.reader.Array
 * 
 * <p>Data reader class to create an Array of {@link Ext.data.Model} objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the <code>mapping</code> property
 * of the field definition if it exists, or the field's ordinal position in the definition.</p>
 * 
 * <p><u>Example code:</u></p>
 * 
<pre><code>
Employee = Ext.define('Employee', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
        {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.        
    ]
});

var myReader = new Ext.data.reader.Array({
    model: 'Employee'
}, Employee);
</code></pre>
 * 
 * <p>This would consume an Array like this:</p>
 * 
<pre><code>
[ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
</code></pre>
 * 
 * @constructor
 * Create a new ArrayReader
 * @param {Object} meta Metadata configuration options.
 */
Ext.define('Ext.data.reader.Array', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'Ext.data.ArrayReader',
    alias : 'reader.array',

    // For Array Reader, methods in the base which use these properties must not see the defaults
    totalProperty: undefined,
    successProperty: undefined,

    /**
     * @private
     * Most of the work is done for us by JsonReader, but we need to overwrite the field accessors to just
     * reference the correct position in the array.
     */
    buildExtractors: function() {
        this.callParent(arguments);

        var fields = this.model.prototype.fields.items,
            i = 0,
            length = fields.length,
            extractorFunctions = [],
            map;
        
        for (; i < length; i++) {
            map = fields[i].mapping;
            extractorFunctions.push(function(index) {
                return function(data) {
                    return data[index];
                };
            }(map !== null ? map : i));
        }

        this.extractorFunctions = extractorFunctions;
    }
});