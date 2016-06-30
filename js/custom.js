var doc = {
  init: function() {
    var _this = this;

    $('#generate').click(function(e) { 
      e.preventDefault();
      _this.generate();
    });

    $('#copy').click(function(e) { 
      e.preventDefault();
      _this.copy();
    });

    $('#clear').click(function(e) { 
      e.preventDefault();
      _this.clear();
    });

    $('#options a').click(function(e) { 
      e.preventDefault();
      _this.paste(this);
    });

    $('.play-form .dropdown-toggle').click(function() {
      _this.updateDocumentation(this.id);
    })
  },


  /* ---
   * FUNCTION: generate()
   *    When the code form is submitted by the user, copy any code in the field to
   *    the output block so that the user can see what that code will look like.
   */
  generate: function() {
    var code = $('#code').val();
    $('#output').html(code);
  },


  /* ---
   * FUNCTION: copy()
   *    When a user clicks on the copy button, the contents of the field are
   *    copied to the clipboard.
   */
  copy: function() {
    $('#code').select();
    document.execCommand('copy');
    document.getSelection().removeAllRanges();
  },


  /* ---
   * FUNCTION: clear()
   *    When a user clicks on the "start over" button, the contents of the field deleted
   */
  clear: function() {
    $('#code').val('');
    this.generate();
    this.updateDocumentation('default');
  },


  /* ---
   * FUNCTION: paste()
   *    When a user clicks on a code option, the HTML associated with that option
   *    is pasted into the field.
   */
  paste: function(el) {
    var id = $(el).attr('data-option');
    var html = $('#' + id).html();

    var currentCode = $('#code').val();
    $('#code').val(currentCode + html);
    this.generate();
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
