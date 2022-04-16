function getImage(name) {
    return <img src={`assets/images/${name}.png`} alt={`${name}`} />
}

const ImageMapping = {
    "Health Kit": getImage('healthkit'),
    "Spaceman 1": getImage('space_man_1'),
    "Spaceman 2": getImage('space_man_2'),
    "Spacewoman 1": getImage('space_woman_1'),
    "Spacewoman 2": getImage('space_woman_2'),
    "Astronaut": getImage('astronaut'),
    "Robot": getImage('robot'),
}

export default ImageMapping;