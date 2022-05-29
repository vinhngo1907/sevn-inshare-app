module.exports = (sequelize, DataTypes) => {
    const FileSchema = sequelize.define('files', {
        // id: DataTypes.INTEGER,
        uuid: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.NUMBER,
        },
        path: {
            type: DataTypes.STRING,
        },
        sender: {
            type: DataTypes.STRING
        },
        receiver: {
            type: DataTypes.STRING
        }
    });

    return FileSchema;
}