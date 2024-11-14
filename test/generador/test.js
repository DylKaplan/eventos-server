import { faker } from '@faker-js/faker';

const generarEvento = () => ({
    nombre: faker.company.name(),
    lugar: faker.address.cityName(),
    equipamiento: faker.commerce.productName(),
    fecha: faker.date.future().toISOString(),
    cantidad_personas: faker.number.int({ min: 10, max: 500 })
});

const generarUsuario = () => ({
    user: faker.internet.userName(),
    password: faker.internet.password()
});

export default {
    generarEvento,
    generarUsuario
};
