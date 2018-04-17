'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return [
            // Users
            Sequelize.models.User.create({
                username: 'dummy2user',
                first_name: 'dummy2first',
                last_name: 'dummy2last',
                password: 'd2pass',
                token: '1234',
                role: 'student',
                email: 'd2@email.com'
            }),
            Sequelize.models.User.create({
                username: 'dummy1user',
                first_name: 'dummy1first',
                last_name: 'dummy1last',
                password: 'd1pass',
                token: '123',
                role: 'student',
                email: 'd1@email.com'
            }).then(function(user1) {
            // Institute
                Sequelize.models.Institute.create({
                    name: 'Georgia Tech University',
                }).then(function(institute) {
                    // Course
                    return Sequelize.models.Course.create({
                        name: 'PhysicsX',
                        institute: institute
                    }).then(function(course) {
                        return [
                            // Session
                            Sequelize.models.Session.create({
                                name: 'Spring2018',
                                course: course,
                                start_date: new Date()
                            }).then(function() {
                                // 3 Exercises + 3 Assignments + 2 Submissions + 3 Training Exercises + 1 Secret Video
                                return [
                                    Sequelize.models.Exercise.create({
                                        name: 'Lab 1 Submission',
                                        course: course,
                                        type: 'Submission',
                                        prompt: 'This is your lab 1 submission exercise'
                                    }).then(function(exercise) {
                                        return Sequelize.models.Assignment.create({
                                            open_date: new Date(),
                                            course: course,
                                            exercise: exercise
                                        }).then(function(assignment) {
                                            return Sequelize.models.Submission.create({
                                                url: 'https://youtu.be/YBpdL9hSac4',
                                                user: user1,
                                                assignment: assignment
                                            });
                                        });
                                    }),
                                    Sequelize.models.Exercise.create({
                                        name: 'Lab 1 Training',
                                        course: course,
                                        type: 'Training',
                                        prompt: 'This is your lab 1 training exercise'
                                    }).then(function(exercise) {
                                        return [
                                            Sequelize.models.Assignment.create({
                                                open_date: new Date(),
                                                course: course,
                                                exercise: exercise
                                            }).then(function(assignment) {
                                                return Sequelize.models.Submission.create({
                                                    url: 'https://youtu.be/AdjMnl3NAPQ',
                                                    user: user1,
                                                    assignment: assignment
                                                });
                                            }),
                                            Sequelize.models.TrainingExercise.create({
                                                order_served: 1,
                                                url: 'https://youtu.be/Vq3O2vrO-WE',
                                                is_calibration: false,
                                                exercise: exercise
                                            }),
                                            Sequelize.models.TrainingExercise.create({
                                                order_served: 2,
                                                url: 'https://youtu.be/htSvZDvIf5I',
                                                is_calibration: false,
                                                exercise: exercise
                                            }),
                                            Sequelize.models.TrainingExercise.create({
                                                order_served: 3,
                                                url: 'https://youtu.be/-QxZv_wJ1aA',
                                                is_calibration: true,
                                                exercise: exercise
                                            })
                                        ];
                                    }),
                                    Sequelize.models.Exercise.create({
                                        name: 'Lab 1 Evaluation',
                                        course: course,
                                        type: 'Evaluation',
                                        prompt: 'This is your lab 1 evaluation exercise'
                                    }).then(function(exercise) {
                                        return [
                                            Sequelize.models.Assignment.create({
                                                open_date: new Date(),
                                                course: course,
                                                exercise: exercise
                                            }),
                                            Sequelize.models.ExerciseSecretVideo.create({
                                                url: 'https://youtu.be/4zHge8wdPTk',
                                                exercise: exercise
                                            })
                                        ];
                                    })
                                ];
                            })
                        ];
                    });
                });
            })
        ];
    },

    down: (queryInterface, Sequelize) => {
        return [
            // Cascade delete institute which removes courses, etc.
            Sequelize.models.Institute.findOne({
                name: 'Georgia Tech University'
            }).destroy({
                cascade: true
            }),

            // Delete users
            queryInterface.bulkDelete('user', {
                username: ['dummy1user', 'dummy2user']
            })
        ];
    }
};
