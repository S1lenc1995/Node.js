import UsersRepository from "../../dal/users/users.repository";
import UsersService from "../../bll/users/users.service"; 

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = {
        manager: {
            createQueryBuilder: jest.fn(),
          },
      getByEmail: jest.fn(),
      createdNewUser: jest.fn(),
      updatedUserData: jest.fn(),
    };
    usersService = new UsersService(usersRepository);
  });

  describe('createdNewUser', () => {
    it('should create a new user', async () => {
      const mockNewUser = { name: 'John Doe' };
      const mockCreatedUser = { id: 1, name: 'John Doe' };

      (usersRepository.createdNewUser as jest.Mock).mockResolvedValue(mockCreatedUser);

      const result = await usersService.createdNewUser(mockNewUser);

      expect(usersRepository.createdNewUser).toHaveBeenCalledWith(mockNewUser);
      expect(result).toEqual(mockCreatedUser);
    });
  });

  describe('getByEmail', () => {
    it('should get a user by email', async () => {
      const mockEmail = 'test@example.com';
      const mockUser = { id: 1, name: 'John Doe' };

      (usersRepository.getByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await usersService.getByEmail(mockEmail);

      expect(usersRepository.getByEmail).toHaveBeenCalledWith(mockEmail);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updatedUserData', () => {
    it('should update user data', async () => {
      const mockEmail = 'test@example.com';
      const mockSettings = { isAdmin: true };
      const mockResult = { success: true };

      (usersRepository.updatedUserData as jest.Mock).mockResolvedValue(mockResult);

      const result = await usersService.updatedUserData(mockEmail, mockSettings);

      expect(usersRepository.updatedUserData).toHaveBeenCalledWith(mockEmail, mockSettings);
      expect(result).toEqual(mockResult);
    });
  });
});