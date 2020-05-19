

module.exports = {
    welcome_message: context => {
        return {
            text: `${context.notification}`,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${context.header}`
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*We\'re glad you\'re here* :tada:'
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*Code of Conduct*\nOur goal is to maintain a safe, helpful and friendly community for everyone, regardless of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other defining characteristic. Please take the time to read through <https://code.localhost|Code of Conduct> before continuing.'
                    }
                },
                {
                    type: 'actions',
                    elements: [
                        {
                            action_id: 'accept',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Accept',
                                emoji: true
                            },
                            style: 'primary',
                            value: 'accept'
                        }
                    ]
                }
            ]
        }
    }
}

//Admin view of homepage
//Todo: Add edit buttons
var blockAdminView = 

[
                  {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*Active Problem IDs*"
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*PID 10942 Justice Critical Error on Email Password Change* \nIf you have a Critical Error for a JST email password reset, please remember to attach PID 10942. Also remember not to change the client to Light Mode, just reset the password."
                    },
                    "accessory": {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Edit",
                        "emoji": true
                      },
                      "value": "10942",
                      
                    }
                  },
                      {
                        "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*PID 10866 Geo Code Error* \nIf you have an OrPOS store giving a 'Geo Code' error, please restart OrPOS and attach PID 10866 to your incident."
                    },
                    "accessory": {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Edit",
                        "emoji": true
                      },
                      "value": "10866"
                    }
                  },
                       {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*PID 10952 Canadian Debit Issues*\nIf you have a Canadian MAU or JST store reporting problems using debit cards, please attach PID 10952 to your incident."
                    },
                    "accessory": {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Edit",
                        "emoji": true
                      },
                      "value": "10952"
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "actions",
                    "elements": [
                      {
                        "type": "button",
                        "text": {
                          "type": "plain_text",
                          "text": "New Configuration",
                          "emoji": true
                        },
                        "value": "new_configuration"
                      }
                    ]
                  }
                ];

  const updateAdminView = async(user) => {
  
            let blocks = blockAdminView;

  let view = {
    type: 'home',
    title: {
      type: 'plain_text',
      text: 'Problem IDs'
    },
    blocks: blocks
  }
  
  return JSON.stringify(view);
};

//Normal user view of homepage
const updateUserView = async(user) => {
  
            let blocks = [
                  {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*Active Problem IDs*"
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*PID 10942 Justice Critical Error on Email Password Change* \nIf you have a Critical Error for a JST email password reset, please remember to attach PID 10942. Also remember not to change the client to Light Mode, just reset the password."
                    },
                    "accessory": {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Edit",
                        "emoji": true
                      },
                      "value": "10942"
                    }
                  },
                      {
                        "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*PID 10866 Geo Code Error* \nIf you have an OrPOS store giving a 'Geo Code' error, please restart OrPOS and attach PID 10866 to your incident."
                    },
                    "accessory": {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Edit",
                        "emoji": true
                      },
                      "value": "10866"
                    }
                  },
                       {
                        "type": "section",
                    "text": {
                      "type": "mrkdwn",
                      "text": "*PID 10952 Canadian Debit Issues*\nIf you have a Canadian MAU or JST store reporting problems using debit cards, please attach PID 10952 to your incident."
                    },
                    "accessory": {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Edit",
                        "emoji": true
                      },
                      "value": "10952"
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "actions",
                    "elements": [
                      {
                        "type": "button",
                        "text": {
                          "type": "plain_text",
                          "text": "New Configuration",
                          "emoji": true
                        },
                        "value": "new_configuration"
                      }
                    ]
                  }
                ];

  let view = {
    type: 'home',
    title: {
      type: 'plain_text',
      text: 'Problem IDs'
    },
    blocks: blocks
  }
  
  return JSON.stringify(view);
};

module.exports = {updateAdminView, updateUserView, blockAdminView};