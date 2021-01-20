// Qui sono definite le funzioni da utilizzare in Handler

const fs = require('fs');
const i18n = require('i18n');
const Setting = require('./Schema')['model'];
const { roles } = require('../../../initializer/roles');

const settingsList = fs.readdirSync(__dirname + '/Models').map((name) => name.substr(0, name.indexOf('Setting')));

exports.getSetting = async (req, res, next) => {
  const tag = req.params.tag.toLowerCase();
  try {
    if (settingsList.indexOf(tag) !== -1) {
      const TagSetting = require(`./Models/${tag}Setting`);
      TagSetting.findOne({ tag: tag })
        .lean()
        .exec((err, setting) => {
          if (!setting) {
            const newSetting = new TagSetting();
            newSetting.tag = tag;
            delete newSetting._id;
            res.status(200).json({ data: newSetting });
          } else {
            res.status(200).json({ data: setting });
          }
        });
    } else res.status(500).json({ result: 'error', message: i18n.__('SETTING.NOT_FOUND') });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: 'error', message: i18n.__('SETTING.NOT_EXISTING') });
  }
};

exports.getAllSettings = async (req, res, next) => {
  const role = req.user ? req.user.role : 'user';
  const rules = getFindRules(role);
  Setting.find(rules)
    .lean()
    .exec((err, settings) => {
      settingsList.forEach((setting) => {
        const alreadyExists = settings.find((r) => r.tag == setting);
        if (!alreadyExists) {
          const TagSetting = require(`./Models/${setting}Setting`);
          const newSet = new TagSetting();
          if (!newSet.reserved || (newSet.reserved && roles.can(role)['readAny']('setting').granted)) {
            newSet.tag = setting;
            settings.push(newSet);
          }
        }
      });
      settings.sort((a, b) => parseFloat(a.tag) - parseFloat(b.tag));
      res.status(200).json({
        data: settings,
      });
    });
};

exports.getAppSettings = async (req, res, next) => {
  Setting.find({})
    .lean()
    .exec((err, settings) => {
      settingsList.forEach((setting) => {
        const alreadyExists = settings.find((r) => r.tag == setting);
        if (!alreadyExists) {
          const TagSetting = require(`./Models/${setting}Setting`);
          const newSet = new TagSetting();
          newSet.tag = setting;
          settings.push(newSet);
        }
      });
      settings.sort((a, b) => parseFloat(a.tag) - parseFloat(b.tag));
      res.status(200).json({
        data: settings,
      });
    });
};

exports.postSetting = async (req, res, next) => {
  const tag = req.params.tag;
  const newSetting = req.body;
  try {
    if (settingsList.indexOf(tag) !== -1) {
      const TagSetting = require(`./Models/${tag}Setting`);
      TagSetting.findOneAndUpdate({ tag: tag }, newSetting, { upsert: true, new: true, runValidators: true })
        .lean()
        .exec((err, setting) => {
          if (err) res.status(500).json({ result: 'error', message: err.message });
          else res.status(200).json({ data: setting, message: i18n.__('SETTING.RETRIEVED') });
        });
    } else res.status(500).json({ result: 'error', message: i18n.__('SETTING.NOT_EXISTING') });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 'error', message: i18n.__('SETTING.NOT_EXISTING') });
  }
};

exports.deleteSetting = async (req, res, next) => {
  const tag = req.params.tag;
  Setting.findOneAndDelete({ tag: tag }).exec((err, setting) => {
    if (err) res.status(500).json({ result: 'error', message: err.message });
    else {
      setting.remove(next);
      res.status(200).json({ data: { status: 'deleted' }, message: i18n.__('SETTING.DELETED') });
    }
  });
};

exports.getServerSetting = async (tag) => {
  tag = tag.toLowerCase();
  if (settingsList.indexOf(tag) !== -1) {
    const TagSetting = require(`./Models/${tag}Setting`);
    return TagSetting.findOne({ tag: tag })
      .lean()
      .exec()
      .then((setting) => {
        return setting;
      });
  } else return {};
};

exports.decNotification = async () => {
  const TagSetting = require(`./Models/functionalitySetting`);
  if (TagSetting) {
    return TagSetting.findOne({ tag: 'client' })
      .exec()
      .then((setting) => {
        setting.notification.limit.remaining--;
        setting.save();
        return setting;
      });
  } else return {};
};

getFindRules = function (role) {
  const rules = {};
  if (roles.can(role)['readAny']('setting').granted) {
    rules['$or'] = [{ reserved: true }, { reserved: false }];
  } else {
    rules.reserved = false;
  }
  return rules;
};
