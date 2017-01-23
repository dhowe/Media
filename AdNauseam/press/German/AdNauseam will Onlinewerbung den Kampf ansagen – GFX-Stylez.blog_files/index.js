			// Text-Tags version 1.0
			//
			//
			// Copyright (c) 2004-2005 Patrick Woods
			// http://www.hakjoon.com/
			//
			// Licensed under the LGPL license because JS QuickTags is LPGL
			// http://www.gnu.org/copyleft/lesser.html
			//
			// **********************************************************************
			// This program is distributed in the hope that it will be useful, but
			// WITHOUT ANY WARRANTY; without even the implied warranty of
			// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
			// **********************************************************************
			//
			// This JavaScript will insert the tags below at the cursor position in IE and
			// Gecko-based browsers (Mozilla, Camino, Firefox, Netscape). For browsers that
			// do not support inserting at the cursor position (Safari, OmniWeb) it appends
			// the tags to the end of the content.
			//
			// The code for this tool is based on Alex King's JS Quicktags.
			//
			// Copyright (c) 2002-2004 Alex King
			// http://www.alexking.org/

			var hak_textile_tag_initialized = 0;

			function addEvent(obj, evType, fn){
			 if (obj.addEventListener){
			    obj.addEventListener(evType, fn, true);
			    return true;
			 } else if (obj.attachEvent){
			    var r = obj.attachEvent("on"+evType, fn);
			    return r;
			 } else {
			    return false;
			 }
			}

			function initQuicktags(identifier) {
				if (!hak_textile_tag_initialized) {
					var getCanvas = document.getElementsByTagName("textarea");
					for (var i = 0; i < getCanvas.length; i++) {
						if (getCanvas[i].name == identifier  || getCanvas[i].id == identifier) {
							var canvas = getCanvas[i];
						}
						if (canvas) {
							var toolbar = document.getElementById("edtoolbar");
							toolbar.style.visibility = "visible";
							var edButtons = new Array();
							edButtons = theButtons;
							for (var i = 0; i < edButtons.length; i++) {
								var thisButton = edShowButton(edButtons[i], canvas);
								toolbar.appendChild(thisButton);
							}
						}
					}
					hak_textile_tag_initialized = 1;
				}
			}

			function edShowButton(button, edCanvas) {
				var theButton = document.createElement("button");
				theButton.type='button';
				theButton.id = button.id;
				theButton.className = 'ed_button btn btn-primary';
				theButton.className += ' ' + button.id;
				theButton.tagStart = button.tagStart;
				theButton.tagEnd = button.tagEnd;
				theButton.open = button.open;
				if (button.id == 'ed_image') {
					theButton.onclick = function() { edInsertImage(edCanvas); }
				}
				else if (button.id == 'ed_link') {
					theButton.onclick = function() { edInsertLink(edCanvas,this); }
				}
				else if (button.id == 'ed_close') {
					theButton.onclick = function() { edCloseAllTags(edCanvas); }
				}
				else {
					theButton.onclick = function() { edInsertTag(edCanvas,this); }
				}
				theButton.value = (button.display) + "";

var text = document.createTextNode((button.display) + "");
theButton.appendChild(text);
document.body.appendChild(theButton);        

				return theButton;
			}

			function edAddTag(button) {
				if (button.tagEnd != '') {
					edOpenTags[edOpenTags.length] = button;
					button.value = '/' + button.value;          
					button.className = button.className.replace("ed_button btn btn-primary", "ed_button_pressed btn btn-primary");
				}
			}

			function edRemoveTag(button) {
				for (i = 0; i < edOpenTags.length; i++) {
					if (edOpenTags[i] == button) {
						edOpenTags.splice(button, 1);
						button.value = button.value.replace('/', '');
						button.className = button.className.replace("ed_button_pressed btn btn-primary", "ed_button btn btn-primary");
					}
				}
			}

			function edCheckOpenTags(button) {
				var tag = 0;
				for (i = 0; i < edOpenTags.length; i++) {
					if (edOpenTags[i] == button) {
						tag++;
					}
				}
				if (tag > 0) {
					return true; // tag found
				}
				else {
					return false; // tag not found
				}
			}

			function edCloseAllTags(edCanvas) {
				var count = edOpenTags.length;
				for (o = 0; o < count; o++) {
					edInsertTag(edCanvas, edOpenTags[edOpenTags.length - 1]);
				}
			}


			function edInsertTag(myField, button) {
				//IE support
				if (document.selection) {
					myField.focus();
				    sel = document.selection.createRange();
					if (sel.text.length > 0) {
						sel.text = button.tagStart + sel.text + button.tagEnd;
					}
					else {
						if (!edCheckOpenTags(button) || button.tagEnd == '') {
							sel.text = button.tagStart;
							edAddTag(button);
						}
						else {
							sel.text = button.tagEnd;
							edRemoveTag(button);
						}
					}
					myField.focus();
				}
				//MOZILLA/NETSCAPE support
				else if (myField.selectionStart || myField.selectionStart == '0') {
					var startPos = myField.selectionStart;
					var endPos = myField.selectionEnd;
					var cursorPos = endPos;
					var scrollTop = myField.scrollTop;

					if (startPos != endPos) {
						myField.value = myField.value.substring(0, startPos)
						              + button.tagStart
						              + myField.value.substring(startPos, endPos)
						              + button.tagEnd
						              + myField.value.substring(endPos, myField.value.length);
						cursorPos += button.tagStart.length + button.tagEnd.length;
					}
					else {
						if (!edCheckOpenTags(button) || button.tagEnd == '') {
							myField.value = myField.value.substring(0, startPos)
							              + button.tagStart
							              + myField.value.substring(endPos, myField.value.length);
							edAddTag(button);
							cursorPos = startPos + button.tagStart.length;
						}
						else {
							myField.value = myField.value.substring(0, startPos)
							              + button.tagEnd
							              + myField.value.substring(endPos, myField.value.length);
							edRemoveTag(button);
							cursorPos = startPos + button.tagEnd.length;
						}
					}
					myField.focus();
					myField.selectionStart = cursorPos;
					myField.selectionEnd = cursorPos;
					myField.scrollTop = scrollTop;
				}
				else {
					if (!edCheckOpenTags(button) || button.tagEnd == '') {
						myField.value += button.tagStart;
						edAddTag(button);
					}
					else {
						myField.value += button.tagEnd;
						edRemoveTag(button);
					}
					myField.focus();
				}
			}

			function edInsertContent(myField, myValue) {
				//IE support
				if (document.selection) {
					myField.focus();
					sel = document.selection.createRange();
					sel.text = myValue;
					myField.focus();
				}
				//MOZILLA/NETSCAPE support
				else if (myField.selectionStart || myField.selectionStart == '0') {
					var startPos = myField.selectionStart;
					var endPos = myField.selectionEnd;
					myField.value = myField.value.substring(0, startPos)
					              + myValue
			                      + myField.value.substring(endPos, myField.value.length);
					myField.focus();
					myField.selectionStart = startPos + myValue.length;
					myField.selectionEnd = startPos + myValue.length;
				} else {
					myField.value += myValue;
					myField.focus();
				}
			}

			function edInsertLink(myField, button, defaultValue) {
				if (!defaultValue) {
					defaultValue = 'http://';
				}
				if (!edCheckOpenTags(button)) {
					var URL = prompt('Enter the URL' ,defaultValue);
					if (URL) {
						button.tagStart = '"';
						button.tagEnd = '":'+ URL;
						edInsertTag(myField, button);
					}
				}
				else {
					edInsertTag(myField, button);
				}
			}

			function edInsertImage(myField) {
				var myValue = prompt('Enter the URL of the image', 'http://');
				if (myValue) {
					myValue = '!' + myValue + '!';
					edInsertContent(myField, myValue);
				}
			}

			// Define Button Object
			function edButton(id, display, tagStart, tagEnd, open) {
				this.id = id;				// used to name the toolbar button
				this.display = display;		// label on button
				this.tagStart = tagStart; 	// open tag
				this.tagEnd = tagEnd;		// close tag
				this.open = open;			// set to -1 if tag does not need to be closed
			}

			var theButtons = new Array();
			var edOpenTags = new Array();

			theButtons[theButtons.length] = new edButton('ed_strong'
			                                          ,'Fett'
			                                          ,'*'
			                                          ,'*'
			                                          );

			theButtons[theButtons.length] = new edButton('ed_emphasis'
			                                          ,'Kursiv'
			                                          ,'_'
			                                          ,'_'
			                                          );

			theButtons[theButtons.length] = new edButton('ed_link'
			                                          ,'URL'
			                                          ,''
			                                          ,''
			                                          ); // special case

			/*theButtons[theButtons.length] = new edButton('ed_image'
			                                          ,'img'
			                                          ,''
			                                          ,''
			                                          ,-1
			                                          ); // special case*/

			/* uncomment these lines to headings and blockquote
			theButtons[theButtons.length] = new edButton('ed_h1'
			                                          ,'h1'
			                                          ,'h1. '
			                                          ,'\n\n'
			                                          );

			theButtons[theButtons.length] = new edButton('ed_h2'
			                                          ,'h2'
			                                          ,'h2. '
			                                          ,'\n\n'
			                                          );

			theButtons[theButtons.length] = new edButton('ed_h3'
			                                          ,'h3'
			                                          ,'h3. '
			                                          ,'\n\n'
			                                          );

			theButtons[theButtons.length] = new edButton('ed_h4'
			                                          ,'h4'
			                                          ,'h4. '
			                                          ,'\n\n'
			                                          );
			theButtons[theButtons.length] = new edButton('ed_block'
			                                          ,'b-quote'
			                                          ,'bq. '
			                                          ,''
			                                          );
				end of comments*/

			theButtons[theButtons.length] = new edButton('ed_close'
			                                          ,'Tags schließen'
			                                          ,''
			                                          ,''
			                                          );	// special case
