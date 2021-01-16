import { Test } from '@nestjs/testing';
import { UserRepository } from '../user.repository';

const mockCredentialsDto = {
  username: 'username',
  password: 'password',
};

describe('UserRepository', () => {
  let userRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save: jest.Mock<any>;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });
  });
});
