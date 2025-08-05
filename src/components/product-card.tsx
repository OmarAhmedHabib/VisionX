"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Eye, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { UploadPrescriptionModal } from "@/components/upload-prescription-modal"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, prescription?: File) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null)

  const handleAddToCart = () => {
    if (product.category === "eyeglasses") {
      setShowPrescriptionModal(true)
    } else {
      onAddToCart(product)
    }
  }

  const handlePrescriptionUpload = (file: File) => {
    setPrescriptionFile(file)
    onAddToCart(product, file)
    setShowPrescriptionModal(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div className="aspect-square overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {product.category === "eyeglasses" ? (
                <Eye className="w-3 h-3 mr-1" />
              ) : (
                <Sun className="w-3 h-3 mr-1" />
              )}
              {product.category}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              ⭐ {product.rating.rate}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${product.price}
            </span>
            <Button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>

      <UploadPrescriptionModal
        open={showPrescriptionModal}
        onOpenChange={setShowPrescriptionModal}
        onUpload={handlePrescriptionUpload}
      />
    </>
  )
}
