import React, { Component } from "react";
import $ from 'jquery';
import { render } from "react-dom";

function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  var activeElId = $(activeEl).attr('id');
  $('.subscript,.supscript').each(function () {
    $(this).data('attr', 'name');
    $(this).data('id', $(activeEl).attr('name'));
    $(this).data('start', activeEl.selectionStart);
    $(this).data('end', activeEl.selectionEnd);
    $(this).data('text', text);
    console.log(this);
  });
  console.log(activeEl, window);
  return text;
}

class TextScriptButton extends Component {
  constructor(props) {
    super(props)
    this.buttonRef = React.createRef();
  }

  convertToSubScript() {
    var o = this.buttonRef.current;
    console.log(o);
    var inputObj = $('[' + $(o).data('attr') + '="' + $(o).data('id') + '"]');
    if (typeof inputObj === 'undefined') return;
    var t = $(o).data('text');
    var s = $(o).data('start');
    var e = $(o).data('end');
    if (typeof t === 'undefined' || t === "") return;
    var isNum = /^\d+|[.oiexk⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᐧᣞᵉˣᵏ]$/.test(t);
    var chars = '+−=()0123456789.oexkaehijklmnoprstuvx⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᐧᵃᵉʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛˣ',
      sub = '₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉.ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉.ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ';
    var subValue = inputObj.val().slice(s, e).replace(t, function (x) {
      var str = '',
        txt = x;//$.trim($(x).unwrap().text());
      for (var i = 0; i < txt.length; i++) {
        var n = -1; n = chars.indexOf(txt[i]);
        str += (n !== -1 ? sub[n] : txt[i]);
      }
      return str;
    });
    var inputValArr = inputObj.val().split('');
    var subValArr = subValue.split('');
    var i = 0;
    for (var s; s < e; s++) {
      inputValArr[s] = subValArr[i];
      i++;
    }
    var modVal = inputValArr.join('');
    inputObj.val(modVal);
    return false;
  }

  convertToSupScript() {
    var o = this.buttonRef.current;
    var inputObj = $('[' + $(o).data('attr') + '="' + $(o).data('id') + '"]');
    if (typeof inputObj === 'undefined') return;
    var t = $(o).data('text');
    var s = $(o).data('start');
    var e = $(o).data('end');
    if (typeof t === 'undefined' || t === "") return;
    var chars = '+−=()0123456789.abcdefghijklmnoprstuvwxyzABDEGHIJKLMNOPRTUVW₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉.ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ',
      sup = '⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᐧᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿᵀᵁⱽᵂ⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᐧᵃᵉʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛˣ';
    var supValue = inputObj.val().slice(s, e).replace(t, function (x) {
      var str = '',
        txt = x; //$.trim($(x).unwrap().text());
      for (var i = 0; i < txt.length; i++) {
        var n = -1; n = chars.indexOf(txt[i]);
        str += (n !== -1 ? sup[n] : txt[i]);
      }
      return str;
    });
    var inputValArr = inputObj.val().split('');
    var supValArr = supValue.split('');
    var i = 0;
    for (var s; s < e; s++) {
      inputValArr[s] = supValArr[i];
      i++;
    }
    var modVal = inputValArr.join('');
    inputObj.val(modVal);
    return false;
  }

  render() {
    if (this.props.scriptType == 'sub') {
      return (
        <button ref={this.buttonRef} style={{ display: "flex", marginLeft: "10px" }} onClick={this.convertToSubScript.bind(this)} className="subscript" data-attr="" data-id="" data-text="" data-start="" data-end="">Subscript</button>
      )
    }
    if (this.props.scriptType == 'sup') {
      return (
        <button ref={this.buttonRef} style={{ display: "flex", marginLeft: "10px" }} onClick={this.convertToSupScript.bind(this)} className="supscript" data-attr="" data-id="" data-text="" data-start="" data-end="">Superscript</button>
      )
    }
  }
}

class SubScriptSuperScriptInput extends Component {
  componentDidMount() {
    document.onmouseup = document.onkeyup = document.onselectionchange = function () {
      getSelectionText();
    };
  }
  render() {
    return (
      <div>
        <header>
          <div style={{ display: "flex", margin: "10px" }}>
            <input type="text" id="textConverter" name="textConverter" placeholder="Type something here..." />
            <TextScriptButton scriptType="sub" />
            <TextScriptButton scriptType="sup" />
          </div>
        </header>
      </div>
    );
  }
}

export default SubScriptSuperScriptInput;
