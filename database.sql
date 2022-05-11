CREATE TABLE collisions (
    crash_date DATE NOT NULL,
    crash_time TIME WITHOUT TIME ZONE NOT NULL,
    borough CHARACTER VARYING(20) NOT NULL,
    zip_code SMALLINT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    on_street_name CHARACTER VARYING(80) NOT NULL,
    cross_street_name CHARACTER VARYING(80) NOT NULL,
    off_street_name CHARACTER VARYING(80) NOT NULL,
    number_of_persons_injured CHARACTER VARYING(80) NOT NULL,
    number_of_persons_killed CHARACTER VARYING(80) NOT NULL,
    contributing_factor_vehicle_1 CHARACTER VARYING(80) NOT NULL,
    contributing_factor_vehicle_2 CHARACTER VARYING(80) NOT NULL,
    contributing_factor_vehicle_3 CHARACTER VARYING(80) NOT NULL,
    contributing_factor_vehicle_4 CHARACTER VARYING(80) NOT NULL,
    contributing_factor_vehicle_5 CHARACTER VARYING(80) NOT NULL,
    collision_id SERIAL PRIMARY KEY,
    vehicle_type_code_1 CHARACTER VARYING(80) NOT NULL,
    vehicle_type_code_2 CHARACTER VARYING(80) NOT NULL,
    vehicle_type_code_3 CHARACTER VARYING(80) NOT NULL,
    vehicle_type_code_4 CHARACTER VARYING(80) NOT NULL,
    vehicle_type_code_5 CHARACTER VARYING(80) NOT NULL
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(45) NOT NULL,
    badget_number INT NOT NULL
);