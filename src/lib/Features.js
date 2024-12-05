import  monent  from 'moment'

const fileFormate = (url) => {
    const filleExtn = url.split('.').pop();
    if (filleExtn === 'mp4' || filleExtn === 'webm' || filleExtn === 'ogg') {
        return 'video';
    }

    if (filleExtn === 'mp3' || filleExtn === 'wav') {
        return 'audio';
    }
    if (filleExtn === 'png' || filleExtn === 'jpg' || filleExtn === 'jpeg' || filleExtn === 'gif') {
        return 'image';
    }

    if (filleExtn === 'mp4' || filleExtn === 'webm' || filleExtn === 'ogg') {
        return 'video';
    }

    return 'file';
};

const transformImage = (url = '', width = 100) => url;


const getLast7days = () => {

    const currentDate = monent();

    const last7days = [];

    for (let i = 0; i < 7; i++) {
        const dayDate = currentDate.clone().subtract(i, 'days');
        const dayName = dayDate.format('dddd')

        last7days.unshift(dayName)
    }
    return last7days;
}

export { fileFormate, transformImage, getLast7days };