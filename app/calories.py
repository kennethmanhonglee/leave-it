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
    # FIXME
    rer = get_rer(pet.current_weight)
    if pet.age > 11:
        if pet.neutered:
            return 1.6 * rer
        else:
            return 1.8 * rer
