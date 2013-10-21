## 'ello 'ello

What do we have here then?

### Problem

Templating HTML in JavaScript sucks.

You can write as many angular directives as you like, and write mustache templates until you're all out of curly-braces, but the long and short of it is there's still strings with HTML in it.

There has to be a better way.

### Aims

* Must not be too complicated. HTML is not complicated - why would you choose something worse?
* Must not be too verbose. HTML is not verbose - why would you add bloat?
* Must not involve concatenating strings - I'm sick of that.
* Not obtuse for the sake of it. Sacrifice if it makes sense - let's not get abstract.

### Solution

'ello. 50 (ish) lines of JavaScript that make a fluent HTML templating engine.

ello allows you to create HTML by simply writing JS. It sacrifices around 20% more characters than if you were to write it as just a string, in exchange for allowing you to write code rather than a huge long string.

### Examples

Create a new element using the el() function. Its only parameter is the tag name.

    el("a")

Add an attribute by chaining on a function call - the first argument is the attribute name, the second is the value.

    el("a")("href", "http://chris-alexander.co.uk")
    
Output by calling the function with no arguments.

    el("a")("href", "http://chris-alexander.co.uk")()

Result:
    
    <a href="http://chris-alexander.co.uk"></a>

Add textual content by providing just a string argument.

    el("a")("href", "http://chris-alexander.co.uk")("Blog")()

Result:

    <a href="http://chris-alexander.co.uk">Blog</a>

Provide child nodes (which override text content) by either calling with another ello...

    el("a")("href", "http://chris-alexander.co.uk")
    (
      el("i")("class", "icon-home")
    )()
    
Result:

   <a href="http://chris-alexander.co.uk"><i class="icon-home"></i></a>
   
... or an array of them.

    el("a")("href", "http://chris-alexander.co.uk")(
    [
      el("i")("class", "icon-home"),
      "Home"
    ])()
    
Result:

    <a href="http://chris-alexander.co.uk"><i class="icon-home"></i> Home</a>
    
That's it.
