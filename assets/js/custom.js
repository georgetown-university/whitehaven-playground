var doc = {
  inlineCSS: 0,

  /* ---
   * FUNCTION: init()
   *    Initialization function that sets up all event handlers.
   */

  init: function() {
    var _this = this;

    $('#code').on('input propertychange paste', function() {
      _this.generate();
    })

    $('#copy').click(function(e) {
      _this.copy(e);
    });

    $('#clear').click(function(e) {
      _this.clear(e);
    });

    $('#options a').click(function(e) {
      _this.paste(e, this);
    });

    $('.play-form .dropdown-toggle').click(function(e) {
      _this.updateDocumentation($(this).attr('data-docid'));
    });
  },


  /* ---
   * FUNCTION: generate()
   *    When the code form is submitted by the user, copy any code in the field to
   *    the output block so that the user can see what that code will look like.
   */
  generate: function() {
    // Clean up the code in the code text area first.
    var code = this.cleanCode( $('#code').val() );

    this.clear();
    this.updateCode(code);
  },


  /* ---
   * FUNCTION: cleanCode()
   *    Checks to make sure inputted code is OK (free of script tags).
   */
  cleanCode: function(code) {
    var errors = [],
        newCode = code;

    // Check for inline JS.
    if (code.indexOf('<script') > -1) {
      var goodCodeStart = code.split('<script')[0] || '',
          goodCodeEnd   = code.split('</script>')[1] || '';

      newCode = goodCodeStart + goodCodeEnd;
      errors.push('#error-js');
    }

    // Check for inline CSS.
    if (code.indexOf('style=') > -1) {
      this.inlineCSS++;

      if (this.inlineCSS > 2) {
        errors.push('#error-css-bad');
      } else {
        errors.push('#error-css');
      }
    }

    // Display errors and return cleaned code.
    this.showErrors(errors);
    return newCode;
  },


  /* ---
   * FUNCTION: showErrors()
   *    Utility function that displays error modal if there are errors.
   */
  showErrors: function(errors) {
    $('#error section').hide();

    if (errors.length) {
      errors.forEach(function(el) {
        console.log(el);
        $(el).show();
      });

      $('#error').modal('show');
    }
  },


  /* ---
   * FUNCTION: updateCode()
   *    Utility function that updates the inputted code and regenerates output.
   */
  updateCode: function(code) {
    $('#code').insertAtCursor(code);
    $('#output').html(code);
  },


  /* ---
   * FUNCTION: copy()
   *    When a user clicks on the copy button, the contents of the field are
   *    copied to the clipboard.
   */
  copy: function(e) {
    e.preventDefault();
    $('#code').select();
    document.execCommand('copy');
    document.getSelection().removeAllRanges();
  },


  /* ---
   * FUNCTION: clear()
   *    When a user clicks on the "start over" button, the contents of the field deleted
   */
  clear: function(e) {
    if (e) { e.preventDefault(); }

    $('#code').val('').focus();
    this.updateDocumentation('default');
  },


  /* ---
   * FUNCTION: paste()
   *    When a user clicks on a code option, the HTML associated with that option
   *    is pasted into the field.
   */
  paste: function(e, el) {
    e.preventDefault();
    var id = $(el).attr('data-option');
    var code = $('#' + id).html();

    this.updateCode(code);

    // For certain cases, run function from Whitehaven theme JS to define events.
    switch(id) {
      case 'snippet-content-expand':
        initExpandableContent();
        break;
      case 'snippet-list-filter':
        initFilterableLists();
        break;
      default:
        break;
    }
  },


  /* ---
   * FUNCTION: updateDocumentation()
   *    Display documentation in the sidebar, based on a passed-in ID.
   */
  updateDocumentation: function(id) {
    $('.play-docs section').hide();
    $('.play-docs section[data-doc=' + id + ']').show();
  }
};


$(document).ready(function() {
  doc.init();
});


/* ---
 * UTILITY FUNCTION: insertAtCursor()
 *    Inserts new text wherever the cursor is in a text field.
 *    Found here: https://richonrails.com/articles/text-area-manipulation-with-jquery
 */
$.fn.extend({
  insertAtCursor: function(myValue) {
    return this.each(function(i) {
      if (document.selection) {
        //For browsers like Internet Explorer
        this.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        this.focus();
      }
      else if (this.selectionStart || this.selectionStart == '0') {
        //For browsers like Firefox and Webkit based
        var startPos = this.selectionStart;
        var endPos = this.selectionEnd;
        var scrollTop = this.scrollTop;
        this.value = this.value.substring(0, startPos) + myValue +
                this.value.substring(endPos,this.value.length);
        this.focus();
        this.selectionStart = startPos + myValue.length;
        this.selectionEnd = startPos + myValue.length;
        this.scrollTop = scrollTop;
      } else {
        this.value += myValue;
        this.focus();
      }
    })
  }
})
