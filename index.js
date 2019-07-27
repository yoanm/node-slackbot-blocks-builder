'use strict';

const blockBuilderHelper = {
    block: {
        /**
         * @param {PlainTextElement|MrkdwnElement}     textObject
         * @param {String}                             blockId
         * @param {KnownAction|Action|ImageElement}    accessoryObject
         * @param {(PlainTextElement|MrkdwnElement)[]} fieldList
         *
         * @returns {SectionBlock}
         */
        section: (textObject, accessoryObject = undefined, fieldList = undefined, blockId = undefined) => {
            return {type: 'section', text: textObject, block_id: blockId, fields: fieldList, accessory: accessoryObject};
        },
        /**
         * @returns {DividerBlock}
         */
        divider: () => {
            return {type: 'divider'};
        },
        /**
         * @param {(ImageElement|UserElement|PlainTextElement|MrkdwnElement)[]} elementList
         *
         * @returns {ContextBlock}
         */
        context: (elementList = []) => {
            return {type: 'context', elements: elementList};
        },
    },
    element: {
        /**
         * @param {String} url
         * @param {String} altText
         *
         * @returns {ImageElement}
         */
        image: (url, altText) => {
            return {type: 'image', image_url: url, alt_text: altText};
        },
    },
    action: {
        /**
         * @param {PlainTextElement} textObject
         * @param {String}           actionId
         * @param {String}           buttonValue
         * @param {String}           styleValue
         * @param {Confirm}          confirmObject
         * @param {String}           urlValue
         *
         * @returns {Button}
         */
        button: (textObject, actionId, buttonValue = undefined, styleValue = undefined, confirmObject = undefined, urlValue = undefined) => {
            return {
                type: 'button',
                text: textObject,
                action_id: actionId,
                value: buttonValue,
                url: urlValue,
                style: styleValue,
                confirm: confirmObject
            };
        }
    },
    object: {
        /**
         * @param {String}  message
         * @param {Boolean} enableEmoji
         *
         * @returns {PlainTextElement}
         */
        plainText: (message, enableEmoji) => blockBuilderHelper.object.text(message, 'plain_text', enableEmoji),
        /**
         * @param {String}  message
         * @param {Boolean} isVerbatim
         *
         * @returns {MrkdwnElement}
         */
        mrkdwnText: (message, isVerbatim) => blockBuilderHelper.object.text(message, 'mrkdwn', undefined, isVerbatim),
        /**
         * @param {String}  message
         * @param {String}  messageType
         * @param {Boolean} enableEmoji
         * @param {Boolean} isVerbatim
         *
         * @returns {MrkdwnElement|PlainTextElement}
         */
        text: (message, messageType = 'mrkdwn', enableEmoji = true, isVerbatim = false) => {
            const elem = {type: messageType, text: message};

            if (messageType === 'plain_text') {
                elem.emoji = enableEmoji;
            } else {
                elem.verbatim = isVerbatim;
            }

            return elem;
        },
        /**
         * @param {PlainTextElement}               titleObject
         * @param {PlainTextElement|MrkdwnElement} textObject
         * @param {PlainTextElement}               confirmObject
         * @param {PlainTextElement}               denyObject
         *
         * @returns {Confirm} Slack confirm object
         */
        confirm: (titleObject, textObject, confirmObject, denyObject) => {
            return {
                title: titleObject,
                text: textObject,
                confirm: confirmObject,
                deny: denyObject
            }
        },
    },
    helper: {
        /**
         * @param {String}  url
         * @param {String}  title       Will be displayed instead of displaying plain text url
         * @param {Boolean} nullReferer Whether to use nullreferer or not
         * @returns {string}
         */
        link: (url, title = undefined, nullReferer = false) => {
            let cleanUrl = url;
            if (nullReferer === true) {
                cleanUrl = 'http://www.nullrefer.com/?'+url;
            }
            if (title) {
                return '<'+cleanUrl+'|'+title+'>';
            }

            return '<'+cleanUrl+'>';
        },
    }
};

module.exports = blockBuilderHelper;
