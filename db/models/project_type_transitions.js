import { INTEGER } from 'sequelize'

module.exports = (sequelize) => {
  const ProfileTypeTransaction = sequelize.define('ProfileTypeTransaction', {
    project_type: {
      type: INTEGER,
      primaryKey: true
    },
    primary_state: {
      type: INTEGER,
      primaryKey: true
    }
  }, {
    underscored: true,
    tableName: 'Profile_type_transactions'
  })

  ProfileTypeTransaction.associate = function (models) {
    ProfileTypeTransaction.belongsTo(models.ProjectType, {
      through: {
        model: models.ProjectType
      },
      foreignKey: {
        name: 'project_type',
        allowNull: false,
        unique: true
      }
    })

    ProfileTypeTransaction.belongsTo(models.State, {
      through: {
        model: models.State
      },
      foreignKey: {
        name: 'primary_state',
        allowNull: false,
        unique: true
      }
    })

    ProfileTypeTransaction.belongsTo(models.State, {
      through: {
        model: models.State
      },
      foreignKey: {
        name: 'secondary_state',
        allowNull: false,
        unique: true
      }
    })
  }

  return ProfileTypeTransaction
}
