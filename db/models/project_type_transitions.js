import { INTEGER } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectTypeTransaction = sequelize.define('ProjectTypeTransaction', {
    project_type_id: {
      type: INTEGER,
      primaryKey: true
    },
    primary_state_id: {
      type: INTEGER,
      primaryKey: true
    }
  }, {
    underscored: true,
    tableName: 'Project_type_transactions'
  })

  ProjectTypeTransaction.associate = function (models) {
    ProjectTypeTransaction.belongsTo(models.ProjectType, {
      through: {
        model: models.ProjectType
      },
      foreignKey: {
        name: 'project_type',
        allowNull: false,
        unique: true
      }
    })

    ProjectTypeTransaction.belongsTo(models.State, {
      through: {
        model: models.State
      },
      foreignKey: {
        name: 'primary_state',
        allowNull: false,
        unique: true
      }
    })

    ProjectTypeTransaction.belongsTo(models.State, {
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

  return ProjectTypeTransaction
}
