import { STRING, TEXT } from 'sequelize'

module.exports = (sequelize) => {
  const Department = sequelize.define('Department', {
    name: {
      type: STRING,
      isUnique: true,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: TEXT,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Departments'
  })

  // Adding a class level method
  Department.associate = function (models) {
    Department.belongsToMany(models.User, {
      as: 'Users',
      through: {
        model: models.UserDepartment
      }
    })

    Department.belongsToMany(models.Credential, {
      as: 'Projects',
      through: {
        model: models.ProjectDepartment
      }
    })
  }
  return Department
}
