'''
This file will hold all functions used to calculate the basic calorie needed for a dog, depending on their age, body weight, whether they are fixed, etc. 
RER = Resting Energy Requirements - energy to perform essential body functions
RER = 70 * (body weight in kg) ** 0.75

RER is then multiplied by 
'''


def get_rer(weight):
    '''
    first take the dog's weight, and find the RER
    '''
    return (weight**0.75) * 70


def get_calories(pet):
    '''
    take current and ideal weight, and goal, and return corresponding RER for the goal
    source: https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/basic-calorie-calculator
    '''
    current_rer = get_rer(pet.current_weight)
    ideal_rer = get_rer(pet.ideal_weight)
    if pet.goal == 'Neutered Adult':
        return 1.6 * current_rer
    if pet.goal == 'Intact Adult':
        return 1.8 * current_rer
    if pet.goal == 'Inactive/obese prone':
        return 1.3 * current_rer
    if pet.goal == 'Weight Loss':
        return ideal_rer
    if pet.goal == 'Weight Gain':
        return 1.5 * ideal_rer
    if pet.goal == 'Active, working dogs':
        return 3.5 * current_rer
    if pet.goal == 'Puppy 0-4 months':
        return 3 * current_rer
    if pet.goal == 'Puppy 4 months to adult':
        return 2 * current_rer
