def electron_configuration(atomic_number):
    config = ""
    shell = 1
    electrons = atomic_number
    while electrons > 0:
        electrons_in_shell = min(2 * shell**2, electrons)
        config += f"{shell}s{electrons_in_shell} "
        electrons -= electrons_in_shell
        orbitals = ['s', 'p', 'd', 'f']  # Danh sách các orbitals
        for orbital in orbitals:
            if electrons <= 0:
                break
            electrons_in_shell = min(6, electrons)
            config += f"{shell}{orbital}{electrons_in_shell} "
            electrons -= electrons_in_shell
        shell += 1
    return config.strip()

atomic_number = 8  # Ví dụ: Nguyên tử của oxy, có số nguyên tử là 8
configuration = electron_configuration(atomic_number)
print(f"Cấu hình electron của nguyên tử có số nguyên tử là {atomic_number} là: {configuration}")
