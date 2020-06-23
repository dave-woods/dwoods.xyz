import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

// TODO: Add theme with colours for links, backgrounds, etc
export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#A73A3A',
                accent: '#D69B03'
            }
        },
        options: {
            customProperties: true
        }
    }
});
