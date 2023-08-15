import PropTypes from "prop-types";

function Symbol({ name }) {
    const imagePath = `../../../src/assets/images/${name}.PNG`;

    return <img src={imagePath} alt={name} style={{width: "100%"}} draggable="false" />;
}

Symbol.propTypes = {
    name: PropTypes.string,
};

export default Symbol;
