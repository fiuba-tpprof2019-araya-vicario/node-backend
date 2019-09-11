import { STRING } from 'sequelize'

module.exports = (sequelize) => {
  const Credential = sequelize.define('Credential', {
    name: STRING,
    description: STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Credentials'
  })

  Credential.getMsgInexistente = function () {
    return 'Permiso inexistente'
  }
  Credential.getMsgYaExistente = function () {
    return 'Permiso ya inexistente'
  }
  // Adding a class level method
  Credential.associate = function (models) {
    Credential.belongsToMany(models.Profile, {
      as: 'Profiles',
      through: {
        model: models.ProfileCredential
      }
    })
  }
  return Credential
}
