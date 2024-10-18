-- Inserindo 5 categorias
INSERT INTO categoria (nome, descricao) VALUES 
('Eletrônicos', 'Dispositivos eletrônicos e acessórios'),
('Móveis', 'Móveis para casa e escritório'),
('Roupas', 'Vestuário masculino e feminino'),
('Esportes', 'Equipamentos e acessórios esportivos'),
('Alimentos e Bebidas', 'Alimentos e bebidas diversas');

-- Inserindo 20 produtos associados às categorias
INSERT INTO produto (nome, preco_custo, quantidade_estoque, status, categoria_id) VALUES 
('Smartphone X1', 1200.00, 50, true, 1),
('Fone de Ouvido Pro', 200.00, 150, true, 1),
('Notebook Gamer', 3500.00, 30, true, 1),
('Smartwatch Fit', 500.00, 70, true, 1),
('Câmera Digital', 800.00, 20, true, 1),
('Sofá 3 Lugares', 1800.00, 10, true, 2),
('Mesa de Escritório', 750.00, 20, true, 2),
('Cadeira Gamer', 850.00, 40, true, 2),
('Guarda-roupa 6 Portas', 1500.00, 5, true, 2),
('Cama Box Queen', 1200.00, 8, true, 2),
('Camiseta Polo', 80.00, 200, true, 3),
('Jaqueta de Couro', 400.00, 30, true, 3),
('Calça Jeans', 120.00, 150, true, 3),
('Vestido Floral', 180.00, 100, true, 3),
('Tênis Running', 300.00, 100, true, 4),
('Sapato Social', 350.00, 60, true, 4),
('Bola de Futebol', 90.00, 150, true, 4),
('Raquete de Tênis', 400.00, 20, true, 4),
('Arroz Integral', 20.00, 500, true, 5),
('Café em Pó', 15.00, 600, true, 5);