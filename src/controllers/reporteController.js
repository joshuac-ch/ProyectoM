const detalle_ventas = require("../../models/detalle_ventas");
const Productos = require("../../models/productos");
const Usuario = require("../../models/usuario");
const Ventas = require("../../models/ventas");
const { Op, fn, col, literal } = require("sequelize");
const ReporteVentasMensuales = async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();

        // Total de ventas por mes
        const ventasMensuales = await Ventas .findAll({
            attributes: [
                [fn('MONTH', col('fecha_venta')), 'mes'],
                [fn('SUM', col('total_venta')), 'total_ventas'],
            ],
            where: {
                fecha_venta: {
                    [Op.between]: [
                        new Date(`${year}-01-01`),
                        new Date(`${year}-12-31`)
                    ]
                }
            },
            group: [fn('MONTH', col('fecha_venta'))],
            order: [[fn('MONTH', col('fecha_venta')), 'ASC']]
        });

        // Total de productos vendidos por mes
        const productosVendidos = await detalle_ventas.findAll({
            attributes: [
                [fn('MONTH', col('createdAt')), 'mes'],
                [fn('SUM', col('cantidad')), 'productos_vendidos']
            ],
            include: [
                {
                    model: Ventas,
                    attributes: [],
                    where: {
                        fecha_venta: {
                            [Op.between]: [
                                new Date(`${year}-01-01`),
                                new Date(`${year}-12-31`)
                            ]
                        }
                    }
                }
            ],
            group: [fn('MONTH', col('DetalleVenta.id'))],
            order: [[fn('MONTH', col('DetalleVenta.id')), 'ASC']]
        });

        // Vendedor con más ventas
        const mejoresVendedores = await Ventas.findAll({
            attributes: [
                'usuario_id',
                [fn('SUM', col('total_venta')), 'total_vendido']
            ],
            where: {
                fecha_venta: {
                    [Op.between]: [
                        new Date(`${year}-01-01`),
                        new Date(`${year}-12-31`)
                    ]
                }
            },
            include: [
                {
                    model: Usuario,
                    attributes: ['nombre', 'apellido']
                }
            ],
            group: ['usuario_id', 'Usuario.id'],
            order: [[literal('total_vendido'), 'DESC']],
            limit: 1
        });

        // Productos más vendidos
        const productosTop = await detalle_ventas.findAll({
            attributes: [
                'producto_id',
                [fn('SUM', col('cantidad')), 'total_vendidos']
            ],
            include: [
                {
                    model: Productos,
                    attributes: ['nombre']
                }
            ],
            group: ['producto_id', 'Producto.id'],
            order: [[literal('total_vendidos'), 'DESC']],
            limit: 5
        });

        res.json({
            ventasMensuales,
            productosVendidos,
            mejorVendedor: mejoresVendedores[0],
            productosMasVendidos: productosTop
        });

    } catch (error) {
        console.error("Error en reporte mensual:", error);
        res.status(500).json({ message: "Error al generar reporte mensual", error: error.message });
    }
};
const probarRelacionVentas = async (req, res) => {
  try {
    const ventas = await Ventas.findAll({
      include: [
        {
          model: detalle_ventas,
          as: 'detalles'
        }
      ],
      limit: 5 // solo para prueba, puedes quitarlo
    });

    res.status(200).json(ventas);
  } catch (error) {
    console.error("Error en la prueba de relación ventas-detalles:", error);
    res.status(500).json({ message: "Error en la prueba", error: error.message });
  }
};
module.exports={ReporteVentasMensuales,probarRelacionVentas}