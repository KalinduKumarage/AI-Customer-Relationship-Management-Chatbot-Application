import { blue } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    paper:{
        padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', 
    },
    mapContainer: {
        height: '80vh', width: '100%',fontSize: 10
    },
    pointer: {
        position: 'absolute'
    },
    h1: { fontSize: 6, color: blue}
}));