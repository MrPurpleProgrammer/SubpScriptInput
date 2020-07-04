This react component renders an text input with two subscript and superscript button. If the user highlights some text and clicks on these buttons the text will automatically convert to a UNICODE subscript/superscript character.

## One thing to note: Not all characters can be converted into a UNICODE sub/super script character. Some letters and numbers do not have a corresponding UNICODE character to conver to, and will stay the same way are. Text inputs only take in UNICODE characters, and therefore is a fundamental limitation for this functionality. 

## Dependencies Include:
    1. $ from 'jquery'