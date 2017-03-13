---
layout: default

documentation:
  - id: default
    title: Getting Started
    content: |
      Type in any HTML into the big text box.  Some code options above the text box have been provided to get you started.  Click on any of these code options to learn more about what they do.  

      For best results, play around with the code, particularly the classes. Don't be scared of the code.  It won't bite - we promise!

      A more comprehensive <a href="https://georgetown-university.github.io/whitehaven-guide/" target="_blank">guide to the Whitehaven theme</a> is available, if you need additional resources.

  - id: buttons
    title: Buttons
    content: |
      A more flexible way to implement calls-to-action is to use Buttons. Full documentation is available on <a href="http://v4-alpha.getbootstrap.com/components/buttons/" target="_blank">Bootstrap Buttons</a>, but here are some examples. Buttons are best used in Cards to provide a call-to-action, but can also be used alone in Primary or Secondary Body when attention is needed for a link. Buttons may also include additional code for icons.

      <strong>Important!</strong> Block buttons should only be used inside smaller containers, such as Cards. Using them at the page level will result in buttons that span the entire width of the page.

  - id: cards
    title: Cards
    content: |
      A more flexible way to implement callouts is to use Cards. Full documentation is available on <a href="http://v4-alpha.getbootstrap.com/components/card/" target="_blank">Bootstrap Cards</a>, including Card Decks, but here are some examples based on GU’s current callout styles.

      The Card functionality allows you to mix-and-match items that you need, providing greater flexibility. Cards may be used in Primary Body, Secondary Body, Global Callout, or Page Callout. The design may be slightly different than illustrated here, due to differences of content.

  - id: imgovrlay
    title: Image Overlay Cards
    content: |
      For more flexibility than the standard Bootstrap image overlays, use the following code to change the position of the overlay text.

      Additionally, adding an optional class of <em>.faded</em> will fade the underlying image so the text or button is easier to read.

  - id: deck
    title: Card Decks
    content: |
      Card Decks group several Cards together, for when a collection of callouts is required. Any of the Card styles  can be used inside the Card Deck, as long as the outer container is a <em>div.card-deck</em> and the inner boxes are <em>div.card</em>.

      There is no limit to the number of Cards that can be placed inside a Card Deck, but it works best with a minimum of <strong>two</strong>. There will be a maximum of three cards per row.

  - id: alignment-block
    title: Block Alignment
    content: |
      Bootstrap uses <em>.pull-*-*</em> classes to float elements to the left or right, where content will flow and wrap around it, e.g. an image included in a block of text. It should be used with other utility classes to add consistent spacing around the floated element.

      <strong>Important!</strong> Due to the responsive nature of the website, it is recommended to use the “medium” breakpoint for floated elements, so that the content is instead stacked on smaller screens. Simply floating elements can cause the wrapped text to become unreadable if the screen is too small to contain the floated image and the text.

      If the floated text should not wrap around the pull element – e.g. a list floated against an image – an additional class of <em>.floatfix</em> can produce the desired display.

  - id: alignment-text
    title: Text Alignment
    content: |
      It is not recommended to center- or right-align most content; keeping text left-justified presents a usable and readable experience. However, in cases when center- or right-aligning content is necessary, the following code should be used.

      <strong>Important!</strong> Left-aligned text is the default, but there is an optional class to use, if required.
---
